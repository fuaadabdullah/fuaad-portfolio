import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import projects from "@/data/projects";
import { aboutPhotos } from "@/data/aboutPhotos";
import { services } from "@/data/services";

function publicPath(src: string): string {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

function expectPublicAsset(src: string): void {
  expect(src, "media source should use a public absolute path").toMatch(/^\//);
  expect(fs.existsSync(publicPath(src)), `${src} should exist in public/`).toBe(true);
}

describe("public media assets", () => {
  it("keeps project proof, hero, and gallery media backed by files", () => {
    for (const project of projects) {
      expect(project.proofMedia?.some((item) => item.status === "pending")).toBeFalsy();

      if (project.image?.src) {
        expectPublicAsset(project.image.src);
      }

      for (const item of project.proofMedia ?? []) {
        expectPublicAsset(item.src);
      }

      for (const item of project.gallery ?? []) {
        expectPublicAsset(item.src);
      }

      for (const shot of project.observability?.shots ?? []) {
        expectPublicAsset(shot.src);
      }
    }
  });

  it("keeps service and about media backed by files", () => {
    for (const photo of aboutPhotos) {
      expectPublicAsset(photo.src);
    }

    for (const service of services) {
      for (const shot of service.caseStudy?.images ?? []) {
        expectPublicAsset(shot.src);
      }
    }
  });
});
