const path = require('path')
const fs = require('fs')
const requireContext = require('require-context')
const { createRoutes } = require('@nuxt/utils')

import { defineNuxtModule } from '@nuxt/kit'
import { Nuxt } from 'nuxt/schema'

const traverseDir = (
  dir: any,
  callback: { (fullPath: any): void; (arg0: any): void }
) => {
  const dirExists = fs.existsSync(dir)

  if (dirExists) {
    callback(dir)

    fs.readdirSync(dir).forEach((file: any) => {
      let fullPath = path.join(dir, file)
      if (fs.lstatSync(fullPath).isDirectory()) {
        traverseDir(fullPath, callback)
      }
    })
  }
}

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: 'register-modules',
    // The key in `nuxt.config` that holds your module options
    configKey: '',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options for your module, can also be a function returning those
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(
    moduleOptions: {
      modules: [string]
      config: {
        modulesDir: string
        srcDir: string
        dir: {
          pages: string
          store: string
          components: string
        }
      }
    },
    nuxt: Nuxt
  ) {
    const config = Object.assign(
      {
        modulesDir: 'modules',
        srcDir: 'src',
        dir: {
          pages: 'pages',
          store: 'store',
          components: 'components',
          composables: 'composables',
        },
      },
      moduleOptions.config
    )

    moduleOptions.modules.forEach((moduleName) => {
      // Automatically register all components of the module
      nuxt.hook('components:dirs', (dirs: any) => {
        // Add ./components dir to the list
        const componentsDir = path.resolve(
          `${config.srcDir}/${config.modulesDir}/${moduleName}/${config.dir.components}`
        )

        traverseDir(componentsDir, (fullPath) => {
          dirs.push({
            path: fullPath,
            pathPrefix: false,
          })
        })
      })

      const composablesDir = path.resolve(
        `${config.srcDir}/${config.modulesDir}/${moduleName}/${config.dir.composables}`
      )

      // Auto register composables
      nuxt.hook('imports:dirs', (dirs: any) => {
        traverseDir(composablesDir, (fullPath) => {
          dirs.push({
            path: fullPath,
          })
        })
      })

      // Auto register pages
      const pagesDirectory = path.resolve(
        `${config.srcDir}/${config.modulesDir}/${moduleName}/${config.dir.pages}`
      )
      const pagesExist = fs.existsSync(pagesDirectory)

      if (pagesExist) {
        const files = requireContext(pagesDirectory, true, /\.vue$/)
          .keys()
          .map((fileName: string) =>
            path
              .normalize(`${config.dir.pages}/${fileName}`)
              .replace(/\\/g, '/')
          )

        nuxt.hook('pages:extend', (pages: any) => {
          pages.push(
            ...createRoutes({
              files,
              srcDir: `${config.srcDir}/${config.modulesDir}/${moduleName}`,
              pagesDir: config.dir.pages,
            }).map((route: any) => ({
              name: moduleName + '-' + route.name,
              path: '/' + moduleName + route.path,
              file: route.component,
            }))
          )
        })
      }
    })
  },
})
