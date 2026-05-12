import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Utility scripts at root level
    "fix-encoding.js",
  ]),
  {
    rules: {
      // These patterns are intentional in this codebase:
      // - setMounted(true) in useEffect is a standard client-side hydration guard
      // - ThemeBtn is now a proper top-level component (fixed in Navbar.tsx)
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
]);

export default eslintConfig;
