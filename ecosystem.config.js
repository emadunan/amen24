module.exports = {
  apps: [
    {
      name: "backend",
      script: "./apps/dist/main.js",
      cwd: "./apps/backend",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5005,
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 5105,
      },
    },
    {
      name: "frontend",
      script: "sh",
      args: "-c '[[ $NODE_ENV == \"test\" ]] && npm run start:test || npm run start'",
      cwd: "./apps/frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3007,
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 3105,
      },
    },
  ],
};
