<template>
  <section class="content-wrapper">
    <nuxt-layout></nuxt-layout>
  </section>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: 'redirect-clean-energy'
});
</script>
