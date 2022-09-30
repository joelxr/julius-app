<script setup lang="ts">
import VueFeather from 'vue-feather'

interface BaseButtonProps {
  icon?: string
}

const props = defineProps<BaseButtonProps>()
</script>

<template>
  <button type="button" :class="$style.btn" v-bind="$attrs">
    <vue-feather v-if="props.icon" :type="props.icon" size="20px"></vue-feather>
    <slot />
  </button>
</template>

<style module lang="scss">
@import '../design';

.btn {
  display: flex;
  flex-flow: row nowrap;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1.4rem 0.3rem;
  font-size: 1rem;
  font-weight: 600;
  color: $text-color;
  cursor: pointer;
  background-color: $color-bg-primary;
  border: none;
  border-radius: $gap;
  box-shadow: $default-shadow;

  &:hover {
    background-color: $blue;
  }
}
</style>
