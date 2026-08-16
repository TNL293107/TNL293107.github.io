import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships a native flat config, so it is imported directly.
 * Routing it through `@eslint/eslintrc`'s FlatCompat — the older, widely copied
 * recipe — throws a circular-structure error on this version.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    // `legacy/` is the previous hand-written static site, kept for reference
    // until the rewrite is verified in production. `components/reactbits/` is
    // vendored third-party source (React Bits, MIT) and is not ours to restyle.
    ignores: ["legacy/**", "out/**", ".next/**", "components/reactbits/**"],
  },
];

export default eslintConfig;
