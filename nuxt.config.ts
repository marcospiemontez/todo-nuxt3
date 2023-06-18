import { defineNuxtConfig } from '@nuxt/bridge';
import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  nitro: {
    externals: {
      inline: ["uuid"],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});