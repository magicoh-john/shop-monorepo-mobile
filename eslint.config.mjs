import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    extends: [...nextVitals, ...nextTs],
    settings: {
      next: { rootDir: "apps/web/" },
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/out/**",
    "**/build/**",
    "apps/web/next-env.d.ts",
    // apps/mobile은 eslint-config-expo로 별도 관리
    "apps/mobile/**",
    "packages/**",
  ]),
]);

export default eslintConfig;
