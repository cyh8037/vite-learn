<script setup lang="ts">
// 引入svg组件
import IconComponent from '@assets/vue.svg?component'
</script>

<template>
  <div class="wrap">
    <IconComponent />
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 100px;
  height: 100px;
  background-image: url("/vite.svg");
}
</style>
