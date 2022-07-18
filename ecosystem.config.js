module.exports = {
  apps: [
    {
      name: 'Togihome Buyer Frontend',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
