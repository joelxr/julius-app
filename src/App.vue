<script setup lang="ts">
import TopMenu from './components/TopMenu.vue'
</script>

<template>
  <TopMenu />
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
@import './design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  @extend %font-content;

  height: 100vh;
  background: $color-bg-base;
}
</style>
