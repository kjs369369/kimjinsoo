/// <reference types="node" />
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const matchGlob = require("picomatch");

describe("build glob matcher", () => {
  it("discovers tests and matches the configured Tailwind source patterns", () => {
    const matches = matchGlob(["src/**/*.{test,spec}.{ts,tsx}", "src/**/*.{ts,tsx}"]);
    expect(matches("src/test/example.test.ts")).toBe(true);
    expect(matches("src/components/Navigation.tsx")).toBe(true);
    expect(matches("public/index.html")).toBe(false);
    expect(matchGlob.makeRe("*.{ts,tsx}").test("Navigation.tsx")).toBe(true);
    expect(matchGlob.scan("src/**/*.{ts,tsx}", { parts: true }).parts)
      .toEqual(["src", "**", "*.{ts,tsx}"]);
  });

  it("preserves Vite's default denied file patterns across platforms", () => {
    const deny = matchGlob(
      ["**/.env", "**/.env.*", "**/*.{crt,pem,key,p12,pfx,cer,der}", "**/.npmrc", "**/.yarnrc.yml", "**/.git/**"],
      { dot: true, nocase: true, windows: true },
    );
    expect(deny("C:\\workspace\\project\\.ENV.local")).toBe(true);
    expect(deny("/workspace/project/.git/config")).toBe(true);
    expect(deny("/workspace/project/certs/local.PEM")).toBe(true);
    expect(deny("/workspace/project/.npmrc")).toBe(true);
    expect(deny("/workspace/project/src/index.ts")).toBe(false);
  });
});
