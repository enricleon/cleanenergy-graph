// store/filters.ts
import { defineStore } from 'pinia';
import EnergyState from '@/modules/energy/store/state';
import TimeAggregationEnum from '@/modules/shared/models/enum/time-aggregation.enum';
import { GenerationSource } from '@/modules/energy/models/entity/generation-source';

export const useEnergyStore = defineStore({
  id: 'energy-store',
  state: (): EnergyState => {
    return {
      dummy: 'dummy',
      generationSource: new GenerationSource(),
      dates: {
        start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end: new Date()
      }
    };
  },
  actions: {
    addDummyValue(value: string) {
      this.dummy = value;
    },
    updateDates(dates: { start: Date; end: Date }) {
      this.dates = {
        start: structuredClone(dates.start),
        end: structuredClone(dates.end)
      };
    },
    async fetchGenerationSource() {
      const { $api } = useNuxtApp();

      const response = await $api.energy.getGenerationSource({
        aggregated: TimeAggregationEnum.Day,
        startDate: this.dates.start,
        endDate: this.dates.end
      });

      this.generationSource = GenerationSource.FromResponse(response);
    }
  }
});
