<script setup lang="ts">
import VueFeather from 'vue-feather'

interface BaseButtonProps {
  icon?: string
}

const props = defineProps<BaseButtonProps>()
</script>

<template>
  <button type="button" :class="$style.btn" v-bind="$attrs">
    <vue-feather v-if="props.icon" :type="props.icon"></vue-feather>
    <slot />
  </button>
</template>

<style module lang="scss">
@import '../design';

.btn {
  padding: 0.4rem 1.2rem 0.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: $text-color;
  cursor: pointer;
  background-color: $color-bg-primary;
  border: none;
  border-radius: 6px;
  box-shadow: $default-shadow;
}
</style>
