// store/filters.ts
import { defineStore } from 'pinia';
import EnergyState from '@/modules/energy/store/state';

export const useEnergyStore = defineStore({
  id: 'energy-store',
  state: (): EnergyState => {
    return {
      dummy: 'dummy',
      generationSource: undefined
    };
  },
  actions: {
    addDummyValue(value: string) {
      this.dummy = value;
    },
    async fetchGenerationSource() {
      const { $api } = useNuxtApp();

      const generationSource = await $api.energy.getGenerationSource();
      console.log(generationSource);

      this.generationSource = generationSource;
      // console.log($apiService.getDummyData());
    }
  }
});
