# Ollama Stability Commands

# Start with conservative settings
OLLAMA_NUM_PARALLEL=1 OLLAMA_MAX_QUEUE=10 OLLAMA_KEEP_ALIVE=1m ollama serve

# In another terminal, pull model
ollama pull tinyllama:1.1b

# Monitor resources
ollama stats
ollama list

# Test direct connection
curl http://localhost:11434/api/tags

# If OOM occurs, restart
pkill ollama && sleep 2 && OLLAMA_NUM_PARALLEL=1 ollama serve
