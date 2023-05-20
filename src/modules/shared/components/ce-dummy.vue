<template>
  <div>
    Dummy: {{ value }}
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({})
export default class CeDummy extends Vue {
  @Prop({ required: false, default: 'defaultValue' })
  public value!: string;
}
</script>
