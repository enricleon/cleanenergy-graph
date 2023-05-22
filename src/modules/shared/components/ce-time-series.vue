<template>
  <div class="ce-time-series">
    <client-only>
      <apexchart
        v-if="haveData"
        ref="chart"
        class="ce-time-series__chart"
        type="area"
        :options="chartOptions"
        :series="data"
        height="100%"
      ></apexchart>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import TimeSeries from '@/modules/shared/models/ui/time-series';

@Component
export default class CeTimeSeries extends Vue {
  @Prop({ required: false, default: [] })
  public data!: TimeSeries[];

  @Prop({ required: false, default: {} })
  public options!: any;

  public defaultOptions: any = {
    chart: {
      id: 'vuechart-example',
      type: 'area',
      stacked: true,
      zoom: {
        enabled: false
      }
    }
  };

  get chartOptions() {
    return { ...this.options, ...this.defaultOptions };
  }

  get haveData() {
    return this.data.length;
  }
}
</script>

<style lang="css" scoped>
.ce-time-series {
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
  z-index: 1;
  min-height: 21rem;

  background: white;
  overflow: hidden;
}

.ce-time-series__chart {
  filter: drop-shadow(0px 1px 5px #cbcbcb);
}
</style>
