import { $Fetch, FetchOptions } from 'ohmyfetch';
import ApiConfig from '@/modules/shared/services/api.config';
import EnergyService from '@/modules/energy/services/energy.service';

export default defineNuxtPlugin(() => {
  const { baseUrl } = useRuntimeConfig().public;

  const fetchOptions: FetchOptions = {
    baseURL: baseUrl as string
  };

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions) as $Fetch;

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
