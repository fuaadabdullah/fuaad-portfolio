/**
 * Stylelint config to quiet false positives for Tailwind v4 `@theme` at-rules
 * and to avoid scanning OG image TSX files.
 */
module.exports = {
  rules: {
    // Allow Tailwind CSS-specific and custom at-rules in CSS
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "variants",
          "responsive",
          "screen",
          "theme",
        ],
      },
    ],
  },
  // These are TSX render files; stylelint shouldn't parse them
  ignoreFiles: [
    "app/**/opengraph-image.tsx",
    "app/**/twitter-image.tsx",
    "app/portfolio/**/opengraph-image.tsx",
    "app/portfolio/**/twitter-image.tsx",
  ],
};
