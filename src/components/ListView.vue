<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseTextInput from '../components/BaseTextInput.vue'

interface ListViewProps {
  items: any[]
}

const props = defineProps<ListViewProps>()
const emit = defineEmits(['selected', 'new', 'search'])
</script>

<template>
  <div :class="$style.listView">
    <div :class="$style.controls">
      <BaseTextInput
        placeholder="Buscar"
        style="width: 100%; border-radius: 0"
        @input="emit('search', $event.target.value)"
      />
    </div>
    <div :class="$style.list">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        :class="$style.listItem"
        @click="$emit('selected', item)"
      >
        <slot name="item" v-bind="item" />
      </div>
    </div>
    <div :class="$style.footer">
      <BaseButton
        icon="plus"
        style="width: 100%; height: 100%; border-radius: 0"
        @click="emit('new')"
      >
        Adicionar
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../design';

.listView {
  height: 100%;

  .controls {
    display: flex;
    height: $inner-menu-height;
  }

  .list {
    width: 100%;
    height: calc(100% - $inner-menu-height - $inner-menu-height - 10px);
    padding: $gap;
    overflow-y: auto;

    .listItem {
      padding: $gap calc($gap * 2);
      font-weight: 800;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: $color-bg-primary;
        border-radius: $border-radius;
      }
    }
  }

  .footer {
    height: calc($inner-menu-height + 10px);
  }
}
</style>
