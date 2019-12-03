export default {
  mode: 'spa',
  env: {},
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.css'],
  plugins: ['@/plugins/compositionAPI', '@/plugins/particles'],
  build: {
    extend(config, ctx) {},
  },
  buildModules: [
    '@nuxt/typescript-build',
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module'
  ],
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    ['@nuxtjs/dotenv', { systemvars: true }],
    ['nuxt-sass-resources-loader', ['@/assets/blumatheme.scss']],
  ],
  axios: {},
  toast: {
    position: 'top-center',
  },

  generate: {
    fallback: true,
  },
};
