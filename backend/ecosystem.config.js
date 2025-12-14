module.exports = {
  apps: [
    {
      name: "backend",
      script: "index.js",
      cwd: "/opt/apps/Fullstack-Authentication-system/backend",

      // Load env safely
      env_file: "/opt/apps/Fullstack-Authentication-system/backend/.env",

      env: {
        NODE_ENV: "production"
      },

      // Stability
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 20
    }
  ]
};
