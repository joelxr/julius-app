<script setup lang="ts">
import VueFeather from 'vue-feather'
import GlobalFilter from '../components/GlobalFilter.vue'

import { useFilterStore } from '../stores/filter'

const filterStore = useFilterStore()
</script>

<template>
  <nav :class="$style.menu">
    <router-link :exact-active-class="$style.exactActiveLink" to="/expenses">
      <vue-feather type="shopping-cart" size="20px"></vue-feather>
      Despesas
    </router-link>
    <router-link :exact-active-class="$style.exactActiveLink" to="/products">
      <vue-feather type="shopping-bag" size="20px"></vue-feather>
      Produtos
    </router-link>
    <router-link :exact-active-class="$style.exactActiveLink" to="/tags">
      <vue-feather type="tag" size="20px"></vue-feather>
      Tags
    </router-link>
    <div :class="$style.globalFilter">
      <GlobalFilter />
    </div>
  </nav>
</template>

<style module lang="scss">
@import '../design';

.menu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  gap: calc($gap / 2);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: $top-menu-height;
  padding: 0 $gap;
  background-color: $color-bg-base;
  border-bottom: 2px solid $color-bg-primary;

  a {
    display: flex;
    gap: $gap;
    align-items: center;
    padding: $gap 1rem;
    font-weight: 600;
    color: $text-color;
    text-decoration: none;
    transition: background-color 200ms;

    &.exactActiveLink,
    &:hover {
      background-color: $color-bg-primary;
      border-radius: $border-radius;
      box-shadow: $default-shadow;
    }
  }

  .globalFilter {
    padding: $gap 1rem;
    margin-left: auto;
  }
}
</style>
