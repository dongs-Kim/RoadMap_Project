module.exports = {
  apps: [
    {
      name: 'app',
      script: './repos/server/dist/src/main.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
