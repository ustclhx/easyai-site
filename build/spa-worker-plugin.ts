import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const workerSource = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;
    const acceptsHtml = (request.headers.get("accept") || "").includes("text/html");
    if (!acceptsHtml) return response;
    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
export default worker;
`;

const workerConfig = {
  name: "easyai-portal",
  main: "index.js",
  compatibility_date: "2026-08-10",
  assets: {
    directory: "../client",
    binding: "ASSETS",
    not_found_handling: "single-page-application",
  },
};

export function spaWorker(): Plugin {
  let root = process.cwd();

  return {
    name: "easyai-spa-worker",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", "server");
      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });
      await writeFile(resolve(outputDirectory, "index.js"), workerSource, "utf8");
      await writeFile(
        resolve(outputDirectory, "wrangler.json"),
        `${JSON.stringify(workerConfig, null, 2)}\n`,
        "utf8",
      );
    },
  };
}
