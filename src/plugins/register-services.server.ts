import { $Fetch, FetchOptions } from 'ohmyfetch';
import ApiConfig from '@/modules/shared/services/api.config';
import EnergyService from '@/modules/shared/services/energy.service';

// plugins/hello.ts
export default defineNuxtPlugin(() => {
  const apiConfig = useRuntimeConfig().apiConfig;

  const fetchOptions: FetchOptions = {
    baseURL: apiConfig.baseUrl
  };

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions) as $Fetch;

  console.log('initializing api');
  return {
    provide: {
      api: {
        energy: new EnergyService(apiFetcher)
      }
    }
  };
});

declare module '@nuxt/schema' {
  export interface RuntimeConfig {
    /**
     * ApiService config to initialize the app.
     * @internal
     */
    apiConfig: ApiConfig;
  }
}

interface PluginsInjections {
  $api: {
    energy: EnergyService;
  };
}

// @ts-ignore: #app not found error when building
declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}
