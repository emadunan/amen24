const path = require("path");

module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@amen24/ui": path.resolve(__dirname, "../../packages/ui/src"),
          "@amen24/ui/store": path.resolve(__dirname, "../../packages/ui/src/store"),
        },
      },
    ],
  ],
};
