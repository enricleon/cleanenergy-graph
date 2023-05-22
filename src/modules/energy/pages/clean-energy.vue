<template>
  <section class="content-wrapper">
    <ce-date-selector :dates="selectedDates" @change="changeDates"></ce-date-selector>
    <ce-time-series :data="series" :options="chartOptions"></ce-time-series>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Setup, Watch } from 'vue-facing-decorator';
import { useEnergyStore } from '@/modules/energy/store';
import { GenerationSource } from '@/modules/energy/models/entity/generation-source';

@Component
export default class CleanEnergyPage extends Vue {
  @Setup(() => useEnergyStore())
  private store!: any;

  get selectedDates(): { start: Date; end: Date } {
    return this.store.dates;
  }

  get chartOptions() {
    return {
      chart: {
        type: 'area',
        stacked: true
      },
      title: {
        text: 'Percentage of renewable energies vs fossil fuels'
      },
      legend: {
        horizontalAlign: 'left'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: (value: Number) => `${value.toFixed(0)}%`
        }
      },
      tooltip: {
        y: {
          formatter: (value: Number) => `${value.toFixed(2)}%`
        }
      }
    };
  }

  get series() {
    return this.generationSource.timeSeries.map((serie) => ({
      name: serie.title,
      data: serie.data.map((item) => ({
        x: item.time.getTime(),
        y: item.percentage * 100
      }))
    }));
  }

  get generationSource(): GenerationSource {
    return this.store.generationSource;
  }

  @Watch('selectedDates')
  update() {
    this.store.fetchGenerationSource();
  }

  changeDates(dates: { start: Date; end: Date }) {
    this.store.updateDates(dates);
  }

  mounted() {}

  async serverPrefetch() {
    await this.store.fetchGenerationSource();
  }
}
</script>
<style lang="css">
.content-wrapper {
  display: flex;
  padding: 2rem;
  align-items: center;
  gap: 2em;
  overflow: hidden;
}
</style>
