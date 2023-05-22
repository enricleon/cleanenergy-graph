// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  rootDir: '',
  srcDir: 'src/',
  dir: {
    layouts: 'modules/core/layouts',
    pages: 'modules/core/pages',
    middleware: 'modules/core/middleware'
  },
  imports: {
    dirs: ['modules/core/composables']
  },
  components: {
    dirs: ['modules/core/components']
  },
  runtimeConfig: {
    apiConfig: {
      key: 'Api Config Key',
      baseUrl: 'https://apidatos.ree.es/es/datos/'
    }
    // Keys within public are also exposed client-side
    // public: {
    //   shoeStoreApiBase: '/shoe-api'
    // }
  },
  modules: [
    '@pinia/nuxt',
    [
      '~/modules/core/config/index.ts',
      {
        modules: ['energy', 'shared'],
        config: {
          srcDir: 'src'
        }
      }
    ]
  ],
  // plugins: [{ src: '~/plugins/hello.ts' }],
  build: {
    transpile: ['nuxt/app']
  }
});
