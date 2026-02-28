import { describe, expect, it } from "vitest";
import { getAzureOpenAIConfig } from "./azureOpenAI";

describe("getAzureOpenAIConfig", () => {
  it("uses OpenAI deployment mode for Azure OpenAI resource endpoints", () => {
    const config = getAzureOpenAIConfig({
      AZURE_OPENAI_ENDPOINT: "https://example.openai.azure.com",
      AZURE_API_KEY: "secret",
      AZURE_DEPLOYMENT_ID: "gpt-4o-mini",
    });

    expect(config).toEqual({
      endpoint: "https://example.openai.azure.com",
      apiKey: "secret",
      apiVersion: "2024-06-01",
      mode: "openai-deployment",
      deployment: "gpt-4o-mini",
    });
  });

  it("uses model inference mode for project endpoints", () => {
    const config = getAzureOpenAIConfig({
      AZURE_AI_PROJECT_ENDPOINT:
        "https://resource.services.ai.azure.com/api/projects/goblinos",
      AZURE_API_KEY: "secret",
      AZURE_DEFAULT_MODEL: "gpt-4.1",
      AZURE_API_VERSION: "2024-05-01-preview",
    });

    expect(config).toEqual({
      endpoint: "https://resource.services.ai.azure.com/models",
      apiKey: "secret",
      apiVersion: "2024-05-01-preview",
      mode: "ai-inference-model",
      model: "gpt-4.1",
    });
  });

  it("can use deployment id as the model fallback for model inference mode", () => {
    const config = getAzureOpenAIConfig({
      AZURE_AI_PROJECT_ENDPOINT:
        "https://resource.services.ai.azure.com/api/projects/goblinos",
      AZURE_API_KEY: "secret",
      AZURE_DEPLOYMENT_ID: "gpt-4o-mini",
    });

    expect(config).toEqual({
      endpoint: "https://resource.services.ai.azure.com/models",
      apiKey: "secret",
      apiVersion: "2024-05-01-preview",
      mode: "ai-inference-model",
      model: "gpt-4o-mini",
    });
  });

  it("returns null when required credentials are missing", () => {
    expect(
      getAzureOpenAIConfig({
        AZURE_OPENAI_ENDPOINT: "https://example.openai.azure.com",
      })
    ).toBeNull();
  });
});
