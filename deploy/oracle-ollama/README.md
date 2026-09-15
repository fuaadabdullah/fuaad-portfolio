# TinyLlama host on Oracle Cloud

Runs Ollama with `tinyllama:1.1b` on an Always Free Ampere VM. This is the only place TinyLlama runs; there is no local Ollama setup.

The public `/api/chat` route uses this host for generated, streamed replies in production and previews. Its system prompt includes portfolio facts and recent conversation history. Set `OLLAMA_BASE_URL`, `OLLAMA_API_KEY`, and `OLLAMA_MODEL` in the hosting environment; the old experiment flag is no longer needed.

```text
Vercel (/api/ai, /api/chat) --HTTPS + bearer token--> Caddy (443) -> Ollama (127.0.0.1:11434)
```

- Ollama is never reachable from the internet. Caddy only forwards `POST /api/chat` with the correct token and returns `404` for everything else.
- The model stays loaded (`OLLAMA_KEEP_ALIVE=-1`), so there are no cold starts.
- If this host is down, `/api/ai` falls back to Gemini and public chat returns a retryable 503 error.

**Current production host:** VM `tinyllama` (Ashburn AD-1, `VM.Standard.A1.Flex` 2 OCPU / 12 GB) at `https://157-151-241-88.sslip.io`. That hostname comes from [sslip.io](https://sslip.io), which resolves it to the IP without any DNS setup. To move to `ollama.heyimfuaad.me`, add the Namecheap A record (step 3), re-run step 4 with the new `DOMAIN`, and update `OLLAMA_BASE_URL` in Vercel.

Measured on that VM:

- About 20 tokens/s generation.
- After restarts, the first request per slot takes about 13s to process the prompt. Later requests reuse Ollama's prompt cache, so replies start in about 0.5s.

## 1. Create the VM

OCI Console → **Compute → Instances → Create instance**

| Setting | Value |
| --- | --- |
| Image | Canonical Ubuntu 24.04 |
| Shape | `VM.Standard.A1.Flex`, 2 OCPU, 12 GB memory (Always Free allows up to 4 OCPU / 24 GB in total) |
| Networking | Public subnet, assign a public IPv4 address |
| SSH keys | Upload your public key |

If you see "Out of host capacity", try another availability domain or retry later.

## 2. Open HTTPS in the cloud firewall

Instance → subnet → **Security List → Add Ingress Rules**:

| Source CIDR | Protocol | Destination port |
| --- | --- | --- |
| `0.0.0.0/0` | TCP | 80 |
| `0.0.0.0/0` | TCP | 443 |

Port 80 is only used for the HTTPS certificate challenge and redirect. Consider restricting SSH (22) to your own IP.

## 3. Point a subdomain at the VM

The `heyimfuaad.me` DNS is managed at Namecheap: **Domain List → Manage → Advanced DNS → Add new record**

| Type | Host | Value |
| --- | --- | --- |
| A Record | `ollama` | the VM's public IP |

## 4. Run the setup script

From the repo root on your computer:

```bash
scp deploy/oracle-ollama/setup.sh ubuntu@<VM_IP>:~
ssh ubuntu@<VM_IP> 'sudo DOMAIN=ollama.heyimfuaad.me bash setup.sh'
```

The script installs Ollama and Caddy, pulls the model, generates the token, opens ports 80/443 in the VM's own firewall (Oracle images block them), and runs a local smoke test. It's safe to re-run.

Get the token:

```bash
ssh ubuntu@<VM_IP> 'sudo grep OLLAMA_API_KEY /etc/caddy/ollama.env'
```

## 5. Verify from your computer

```bash
TOKEN=<token>

# Both should print 404: other APIs and missing tokens are rejected
curl -s -o /dev/null -w '%{http_code}\n' https://ollama.heyimfuaad.me/api/tags
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://ollama.heyimfuaad.me/api/chat -d '{}'

# Should stream a reply
curl -N -X POST https://ollama.heyimfuaad.me/api/chat \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"model":"tinyllama:1.1b","messages":[{"role":"user","content":"Say hello"}]}'
```

## 6. Connect Vercel

Project `fuaad-portfolio` → **Settings → Environment Variables**, for **Production** and **Preview**:

| Name | Value |
| --- | --- |
| `OLLAMA_BASE_URL` | `https://157-151-241-88.sslip.io` |
| `OLLAMA_API_KEY` | the token from `/etc/caddy/ollama.env` on the Oracle VM |
| `OLLAMA_MODEL` | `tinyllama:1.1b` |

Redeploy. Chat replies that came from the model have the `X-Chat-Source: tinyllama` response header.

## Maintenance

- **Rotate the token:** `sudo rm /etc/caddy/ollama.env && sudo DOMAIN=ollama.heyimfuaad.me bash setup.sh`, then update `OLLAMA_API_KEY` in Vercel and redeploy.
- **Change model:** `sudo OLLAMA_MODEL=<model> DOMAIN=ollama.heyimfuaad.me bash setup.sh`, then set `OLLAMA_MODEL` in Vercel to match.
- **Logs:** `journalctl -u ollama -f` and `journalctl -u caddy -f`

## Chat verification

Run `pnpm exec vitest run app/api/chat components/chat app/api/mock-ai` for isolated tests that mock the upstream fetch, including production routing, conversation history, streaming and failures. Browser tests may intercept `/api/chat`; the widget always calls the real route. `/api/mock-ai` returns 404 in production.

Without `OLLAMA_BASE_URL`, local development answers from site content. Production returns 503 so configuration problems are visible. A configured but unreachable model also returns 503. Provider credentials stay on the server.

After configuring the hosting environment, open the chat, ask a project question, then ask a follow-up. Confirm the `/api/chat` response has `X-Chat-Source: tinyllama` (or `cache` on a repeat), and test Stop response, Retry response after a network failure, and New chat. Generated answers use a grounded prompt but still need factual review, particularly with small models.
