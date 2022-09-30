<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseTextInput from '../components/BaseTextInput.vue'
import getItemsByDate from '../getItemsByDate'
import { relativeDateFormat } from '../formatters'

interface ListViewProps {
  items: any[]
  aggregateByDate?: boolean
}

const props = defineProps<ListViewProps>()
const emit = defineEmits(['selected', 'new', 'search'])

const itemsByDate = ref([])

watchEffect(() => {
  if (props.aggregateByDate) {
    itemsByDate.value = getItemsByDate(props.items)
  }
})
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
    <div v-if="aggregateByDate" :class="$style.list">
      <div v-for="date in Object.keys(itemsByDate)" :key="date">
        <div :class="$style.date">{{ relativeDateFormat(date) }}</div>
        <div
          v-for="(item, index) in itemsByDate[date].items"
          :key="index"
          :class="$style.listItem"
          @click="$emit('selected', item)"
        >
          <slot name="item" v-bind="item" />
        </div>
      </div>
    </div>
    <div v-else :class="$style.list">
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

    .date {
      margin: $gap;
      color: #888;
      text-transform: uppercase;
    }

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
