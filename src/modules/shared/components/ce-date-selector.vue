<template>
  <section class="ce-date-selector">
    <client-only>
      <v-date-picker v-model.range="selectedDates" mode="date" @change="change()" />
    </client-only>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component
export default class CeTimeSeries extends Vue {
  @Prop({ required: false, default: {} })
  public dates!: { start: Date; end: Date };

  public selectedDates = {};

  @Watch('dates', { immediate: true })
  onSetDates(newValue: any) {
    this.selectedDates = newValue;
  }

  @Watch('selectedDates')
  onSetSelectedDates(newValue: any, oldValue: any) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.change();
    }
  }

  @Emit
  change() {
    return this.selectedDates;
  }
}
</script>
<style lang="css"></style>
