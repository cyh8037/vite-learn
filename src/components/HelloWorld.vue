<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1 class="title">{{ msg }}</h1>
</template>

<style lang="scss" scoped>
.title {
  position: relative;
  color: $theme-color;
  text-decoration: dashed;
  background-color: pink;
}
</style>
