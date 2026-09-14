# Ollama Stability Commands

# Start bound to localhost with conservative settings (never expose 11434 publicly)
OLLAMA_HOST=127.0.0.1:11434 OLLAMA_NUM_PARALLEL=2 OLLAMA_MAX_QUEUE=10 OLLAMA_KEEP_ALIVE=24h ollama serve

# In another terminal, pull model
ollama pull tinyllama:1.1b

# Monitor resources
ollama ps
ollama list

# Test direct connection
curl http://localhost:11434/api/tags

# Test the site's chat route (Origin header is required)
curl -N -X POST http://localhost:3000/api/chat \
  -H "Origin: http://localhost:3000" -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"View projects"}]}'

# If OOM occurs, restart
pkill ollama && sleep 2 && OLLAMA_HOST=127.0.0.1:11434 OLLAMA_NUM_PARALLEL=1 ollama serve
