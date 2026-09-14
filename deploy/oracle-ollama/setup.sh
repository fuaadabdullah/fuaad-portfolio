#!/usr/bin/env bash
# Bootstraps the TinyLlama host for the portfolio chat on an Oracle Cloud Ubuntu VM.
# Ollama listens on localhost only; Caddy terminates HTTPS and forwards nothing but
# POST /api/chat requests carrying the shared bearer token.
#
# Usage (on the VM):  sudo DOMAIN=ollama.heyimfuaad.me bash setup.sh
# Also works as OCI cloud-init user data: set DOMAIN (and optionally OLLAMA_API_KEY) below.
# Safe to re-run. Without OLLAMA_API_KEY, a token is generated once and kept in /etc/caddy/ollama.env.
set -euo pipefail

DOMAIN="${DOMAIN:-}"
MODEL="${OLLAMA_MODEL:-tinyllama:1.1b}"
TOKEN="${OLLAMA_API_KEY:-}"
ENV_FILE=/etc/caddy/ollama.env

if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo." >&2
  exit 1
fi
if [[ -z $DOMAIN ]]; then
  echo "Set DOMAIN to the hostname whose DNS A record points at this VM, e.g. DOMAIN=ollama.heyimfuaad.me" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
# First boot runs unattended upgrades; wait for the apt lock instead of failing
apt_get() { apt-get -o DPkg::Lock::Timeout=600 "$@"; }

echo "==> Installing base packages"
apt_get update -y
apt_get install -y curl gpg openssl debian-keyring debian-archive-keyring apt-transport-https netfilter-persistent iptables-persistent

echo "==> Installing Ollama"
if ! command -v ollama >/dev/null 2>&1; then
  curl -fsSL https://ollama.com/install.sh | sh
fi

mkdir -p /etc/systemd/system/ollama.service.d
cat > /etc/systemd/system/ollama.service.d/override.conf <<'EOF'
[Service]
# Only Caddy on this machine may reach Ollama
Environment="OLLAMA_HOST=127.0.0.1:11434"
# Keep the model in memory so visitors never wait for a cold load
Environment="OLLAMA_KEEP_ALIVE=-1"
# Matches the site's concurrency cap
Environment="OLLAMA_NUM_PARALLEL=2"
Environment="OLLAMA_MAX_QUEUE=10"
EOF
systemctl daemon-reload
systemctl enable ollama
systemctl restart ollama

for _ in $(seq 1 60); do
  curl -fsS http://127.0.0.1:11434/api/version >/dev/null 2>&1 && break
  sleep 1
done
curl -fsS http://127.0.0.1:11434/api/version >/dev/null || { echo "Ollama did not start" >&2; exit 1; }

echo "==> Pulling $MODEL"
ollama pull "$MODEL"
# Load the model into memory now instead of on the first visitor's request
curl -fsS http://127.0.0.1:11434/api/generate -d "{\"model\":\"$MODEL\",\"prompt\":\"\",\"keep_alive\":-1}" >/dev/null

echo "==> Installing Caddy"
if ! command -v caddy >/dev/null 2>&1; then
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key |
    gpg --batch --yes --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
  chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg /etc/apt/sources.list.d/caddy-stable.list
  apt_get update -y
  apt_get install -y caddy
fi

echo "==> Writing proxy config"
if [[ -z $TOKEN && -f $ENV_FILE ]]; then
  TOKEN="$(grep -E '^OLLAMA_API_KEY=' "$ENV_FILE" | cut -d= -f2- || true)"
fi
TOKEN="${TOKEN:-$(openssl rand -hex 32)}"
if [[ ! $TOKEN =~ ^[A-Za-z0-9]{32,}$ ]]; then
  echo "OLLAMA_API_KEY must be at least 32 letters/digits (e.g. openssl rand -hex 32)" >&2
  exit 1
fi
install -m 640 -o root -g caddy /dev/null "$ENV_FILE"
printf 'OLLAMA_DOMAIN=%s\nOLLAMA_API_KEY=%s\n' "$DOMAIN" "$TOKEN" > "$ENV_FILE"

cat > /etc/caddy/Caddyfile <<'EOF'
{$OLLAMA_DOMAIN} {
	request_body {
		max_size 64KB
	}

	@chat {
		method POST
		path /api/chat
		header Authorization "Bearer {$OLLAMA_API_KEY}"
	}

	handle @chat {
		reverse_proxy 127.0.0.1:11434 {
			header_up -Authorization
			# Stream tokens to the site as soon as Ollama produces them
			flush_interval -1
		}
	}

	# Everything else (model pulls, deletes, other APIs, missing token) looks like nothing is here
	handle {
		respond 404
	}
}
EOF

mkdir -p /etc/systemd/system/caddy.service.d
cat > /etc/systemd/system/caddy.service.d/ollama.conf <<EOF
[Service]
EnvironmentFile=$ENV_FILE
EOF

(set -a; . "$ENV_FILE"; caddy validate --adapter caddyfile --config /etc/caddy/Caddyfile >/dev/null)
systemctl daemon-reload
systemctl enable caddy
systemctl restart caddy

echo "==> Opening ports 80/443 in the VM firewall"
# Oracle's Ubuntu images reject inbound traffic other than SSH by default
for port in 80 443; do
  iptables -C INPUT -p tcp -m state --state NEW --dport "$port" -j ACCEPT 2>/dev/null ||
    iptables -I INPUT -p tcp -m state --state NEW --dport "$port" -j ACCEPT
done
netfilter-persistent save

echo "==> Local smoke test"
REPLY="$(curl -fsS http://127.0.0.1:11434/api/chat \
  -d "{\"model\":\"$MODEL\",\"stream\":false,\"messages\":[{\"role\":\"user\",\"content\":\"Say hello in five words.\"}]}")"
if [[ $REPLY != *'"message"'* ]]; then
  echo "Local smoke test failed: $REPLY" >&2
  exit 1
fi
echo "Ollama answered."

cat <<EOF

Done. Remaining steps:
  1. Make sure DNS A record $DOMAIN points at this VM and the OCI security list allows TCP 80 and 443.
  2. Read the token:   sudo grep OLLAMA_API_KEY $ENV_FILE
  3. In Vercel (Production and Preview) set:
       OLLAMA_BASE_URL=https://$DOMAIN
       OLLAMA_API_KEY=<token>
EOF
