module.exports = {
  apps: [
    {
      name: process.env.NODE_ENV === "test" ? "backend-test" : "backend",
      script: "./dist/main.js",
      cwd: "./backend",
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
      name: process.env.NODE_ENV === "test" ? "frontend-test" : "frontend",
      script: "sh",
      args: "-c '[[ $NODE_ENV == \"test\" ]] && npm run start:test || npm run start'",
      cwd: "./frontend",
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
