export type AzureOpenAIDeploymentConfig = {
  endpoint: string;
  apiKey: string;
  apiVersion: string;
  mode: "openai-deployment";
  deployment: string;
};

export type AzureAIInferenceConfig = {
  endpoint: string;
  apiKey: string;
  apiVersion: string;
  mode: "ai-inference-model";
  model: string;
};

export type AzureOpenAIConfig = AzureOpenAIDeploymentConfig | AzureAIInferenceConfig;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function pickFirstNonEmpty(env: NodeJS.ProcessEnv, keys: string[]): string {
  for (const key of keys) {
    const value = env[key];
    if (isNonEmptyString(value)) return value;
  }
  return "";
}

const AZURE_ENDPOINT_KEYS = [
  "PORTFOLIO_AZURE_OPENAI_ENDPOINT",
  "AZURE_OPENAI_ENDPOINT",
  "AZURE_OPENAI_BASE_URL",
  "AZURE_OPENAI_RESOURCE_ENDPOINT",
];

const AZURE_PROJECT_ENDPOINT_KEYS = [
  "PORTFOLIO_AZURE_AI_PROJECT_ENDPOINT",
  "AZURE_AI_PROJECT_ENDPOINT",
];

const AZURE_API_KEY_KEYS = [
  "PORTFOLIO_AZURE_OPENAI_API_KEY",
  "AZURE_OPENAI_API_KEY",
  "AZURE_API_KEY",
];

const AZURE_DEPLOYMENT_KEYS = [
  "PORTFOLIO_AZURE_OPENAI_DEPLOYMENT",
  "AZURE_OPENAI_DEPLOYMENT",
  "AZURE_DEPLOYMENT_ID",
];

const AZURE_API_VERSION_KEYS = [
  "PORTFOLIO_AZURE_OPENAI_API_VERSION",
  "AZURE_OPENAI_API_VERSION",
  "AZURE_API_VERSION",
];

const AZURE_MODEL_KEYS = [
  "PORTFOLIO_AZURE_OPENAI_MODEL",
  "AZURE_OPENAI_MODEL",
  "AZURE_DEFAULT_MODEL",
];

function parseEndpoint(raw: string): { origin: string; path: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    const candidate = /^(https?:)?\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(candidate);
    return { origin: `${url.protocol}//${url.host}`, path: url.pathname };
  } catch {
    const cleaned = trimmed.replace(/\/+$/, "");
    if (!cleaned) return null;
    return { origin: cleaned, path: "" };
  }
}

export function getAzureOpenAIConfig(env: NodeJS.ProcessEnv): AzureOpenAIConfig | null {
  const endpointRaw = pickFirstNonEmpty(env, [...AZURE_PROJECT_ENDPOINT_KEYS, ...AZURE_ENDPOINT_KEYS]);
  const apiKey = pickFirstNonEmpty(env, AZURE_API_KEY_KEYS).trim();
  const deployment = pickFirstNonEmpty(env, AZURE_DEPLOYMENT_KEYS).trim();
  const model = pickFirstNonEmpty(env, AZURE_MODEL_KEYS).trim();

  if (!endpointRaw || !apiKey) {
    return null;
  }

  const parsedEndpoint = parseEndpoint(endpointRaw);
  if (!parsedEndpoint) return null;

  const path = parsedEndpoint.path.toLowerCase();
  const isProjectEndpoint = path.includes("/api/projects/");
  const isModelEndpoint = path.startsWith("/models");

  if (isProjectEndpoint || isModelEndpoint || !deployment) {
    const resolvedModel = model || deployment;
    if (!resolvedModel) return null;

    const apiVersion =
      pickFirstNonEmpty(env, AZURE_API_VERSION_KEYS).trim() || "2024-05-01-preview";

    return {
      endpoint: `${parsedEndpoint.origin}/models`,
      apiKey,
      apiVersion,
      mode: "ai-inference-model",
      model: resolvedModel,
    };
  }

  const apiVersion = pickFirstNonEmpty(env, AZURE_API_VERSION_KEYS).trim() || "2024-06-01";

  return {
    endpoint: parsedEndpoint.origin,
    apiKey,
    apiVersion,
    mode: "openai-deployment",
    deployment,
  };
}
