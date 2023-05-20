<template>
  <section class="content-wrapper">Index</section>
</template>
<script lang="ts">
import { Component, Vue, Setup } from 'vue-facing-decorator';
import { useCoreStore } from '@/modules/core/store';

@Component
export default class IndexPage extends Vue {
  private store = useCoreStore();

  @Setup(() =>
    definePageMeta({
      middleware: 'redirect-energy'
    })
  )
  pageMeta!: any;

  get dummy() {
    return this.store.dummy;
  }
}
</script>
