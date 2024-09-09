module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    //   TODO Add Scope Enum Here
    // 'scope-enum': [2, 'always', ['yourscope', 'yourscope']],
    "type-enum": [
      2,
      "always",
      [
        "feat", // A new feature
        "fix", // A bug fix
        "docs", // Documentation only changes
        "chore", // Changes to the build process or auxiliary tools and libraries such as documentation generation
        "style", // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        "refactor", // A code change that neither fixes a bug nor adds a feature
        "ci", // Changes to your CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
        "test", // Adding missing or correcting existing tests
        "perf", // A code change that improves performance
        "revert", // Reverts a previous commit
        "vercel", // Changes related to Vercel deployments (you can customize or remove this based on your needs)
      ],
    ],
  },
};
