const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Path to your monorepo root
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../../");

const config = getDefaultConfig(projectRoot);

// Watch folders (Metro must watch the shared and store packages)
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, "packages/shared"),
  path.resolve(workspaceRoot, "packages/store"),
];

// Fix module resolution
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Optional: If using symlinked modules
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
