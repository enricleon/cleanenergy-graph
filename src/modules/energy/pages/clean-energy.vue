<template>
  <section class="content-wrapper">
    <ce-dummy :value="dummy"></ce-dummy>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Setup } from 'vue-facing-decorator';
import { useEnergyStore } from '@/modules/energy/store';

@Component
export default class CleanEnergyPage extends Vue {
  @Setup(() => useEnergyStore())
  private store!: any;

  pageMeta!: any;

  get dummy() {
    return this.store.dummy;
  }

  created() {
    this.store.testInjection();
  }
}
</script>
