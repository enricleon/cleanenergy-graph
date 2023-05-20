// store/filters.ts
import { defineStore } from 'pinia';
import EnergyState from '@/modules/energy/store/state';

export const useEnergyStore = defineStore({
  id: 'energy-store',
  state: (): EnergyState => {
    return {
      dummy: 'dummy'
    };
  },
  actions: {
    addDummyValue(value: string) {
      this.dummy = value;
    }
  }
});
