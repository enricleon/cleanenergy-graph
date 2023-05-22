<template>
  <section class="content-wrapper">
    {{ generationSource }}
    <!-- <ce-dummy :value="dummy"></ce-dummy> -->
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

  get generationSource() {
    return this.store.generationSource;
  }

  async serverPrefetch() {
    await this.store.fetchGenerationSource();
  }
}
</script>
