// store/filters.ts
import { defineStore } from 'pinia';
import CoreState from '@/modules/core/store/state';

export const useCoreStore = defineStore({
  id: 'core-store',
  state: (): CoreState => {
    return {
      dummy: []
    };
  },
  actions: {
    addDummyValue(value: string) {
      this.dummy.push(value);
    }
  }
});
