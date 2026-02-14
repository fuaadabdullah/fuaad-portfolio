const nextBase = require("eslint-config-next");
const storybook = require("eslint-plugin-storybook");

const next = nextBase.map((c) => {
  if (!c || typeof c !== "object") return c;
  if (c.name !== "next") return c;

  return {
    ...c,
    rules: {
      ...(c.rules || {}),
      // This rule is mostly a content/typography nuisance for this site.
      "react/no-unescaped-entities": "off",
    },
  };
});

module.exports = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      ".git/**",
      ".storybook/**",
      "**/._*",
      "**/*.stories.*",
      "components/design-system/**",
    ],
  },
  // eslint-config-next is already an ESLint v9 flat config.
  ...next,
  // eslint-plugin-storybook provides flat configs as well.
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "debug"] }],

      // Keep these as warnings so they act as guardrails, not noise.
      "max-lines-per-function": [
        "warn",
        { max: 120, skipComments: true, skipBlankLines: true },
      ],
      complexity: ["warn", 10],
      "max-params": ["warn", 4],
      "max-statements": ["warn", 40],
    },
  },
];
