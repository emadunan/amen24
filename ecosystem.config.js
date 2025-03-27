module.exports = {
  apps: [
    {
      name: "backend",
      script: "./dist/main.js",
      cwd: "./backend", // Ensures PM2 runs commands in the backend directory
      instances: "max", // Uses all available CPU cores
      exec_mode: "cluster", // Enables load balancing
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "frontend",
      script: "npm",
      args: "start",
      cwd: "./frontend", // Ensures PM2 runs commands in the frontend directory
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      }
    }
  ]
};
