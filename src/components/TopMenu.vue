<script setup lang="ts">
import VueFeather from 'vue-feather'
import DateSelect from '../components/DateSelect.vue'
</script>

<template>
  <nav :class="$style.menu">
    <router-link :exact-active-class="$style.exactActiveLink" to="/expenses">
      <vue-feather type="shopping-cart"></vue-feather>
      Despesas
    </router-link>
    <router-link :exact-active-class="$style.exactActiveLink" to="/products">
      <vue-feather type="shopping-bag"></vue-feather>
      Produtos
    </router-link>
    <router-link :exact-active-class="$style.exactActiveLink" to="/tags">
      <vue-feather type="tag"></vue-feather>
      Tags
    </router-link>
    <div :class="$style.dateSelector">
      <DateSelect />
    </div>
  </nav>
</template>

<style module lang="scss">
@import '../design';

.menu {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid $color-bg-primary;

  a {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    padding: 0.6rem 1.8rem;
    font-weight: 600;
    color: $text-color;
    text-decoration: none;
    transition: background-color 200ms;

    &.exactActiveLink,
    &:hover {
      background-color: $color-bg-primary;
      border-radius: 6px;
      box-shadow: $default-shadow;
    }
  }

  .dateSelector {
    margin-left: auto;
    padding: 0.6rem 1.8rem;
  }
}
</style>
