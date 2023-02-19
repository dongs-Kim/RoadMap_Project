module.exports = {
  apps: [
    {
      name: 'app',
      script: './repos/server/dist_prod/src/main.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
