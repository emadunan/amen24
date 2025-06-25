const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Path to your monorepo root
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../../");

const config = getDefaultConfig(projectRoot);

// Watch folders (Metro must watch the shared and ui packages)
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, "packages/shared"),
  path.resolve(workspaceRoot, "packages/ui"),
];

// Fix module resolution
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 👇 Add this to ensure subpath "@amen24/ui/store" is resolved
config.resolver.extraNodeModules = {
  "@amen24/ui": path.resolve(workspaceRoot, "packages/ui"),
};

// Optional: If using symlinked modules
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
