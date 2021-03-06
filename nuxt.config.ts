import {Configuration} from '@nuxt/types'

const nuxtConfig: Configuration = {
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
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
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
    '@nuxtjs/sentry',
    ['@nuxtjs/dotenv', { systemvars: true }],
    ['nuxt-sass-resources-loader', ['@/assets/blumatheme.scss']],
  ],
  axios: {},
  toast: {
    position: 'top-center',
    duration: 2000,
    fullWidth: true,
    iconPack : 'material',
    register: [
      {
        name: 'nofileError',
        message: 'No File!!',
        options: {
          type: 'info',
        },
      },
      {
        name: 'unknownError',
        message: 'UnknownError!!',
        options: {
          type: 'error',
        },
      },
    ],

  },
  sentry: {
    dsn: 'https://53aed09dc7784d1d99581d787819166b@sentry.io/1844122',
  },

  generate: {
    fallback: true,
  },
};

module.exports = nuxtConfig;
