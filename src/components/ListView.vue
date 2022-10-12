<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseTextInput from '../components/BaseTextInput.vue'
import getItemsByDate from '../getItemsByDate'
import debounce from 'lodash.debounce'
import { relativeDateFormat } from '../formatters'

interface ListViewProps {
  items: any[]
  aggregateByDate?: boolean
}

const props = withDefaults(defineProps<ListViewProps>(), {
  aggregateByDate: false,
})

const emit = defineEmits(['selected', 'new', 'search'])

const itemsByDate: Ref<any> = ref([])

watchEffect(() => {
  if (props.aggregateByDate) {
    itemsByDate.value = getItemsByDate(props.items)
  }
})

const handleInput = debounce((event) => {
  emit('search', event.target.value)
}, 1000)
</script>

<template>
  <div :class="$style.listView">
    <div :class="$style.controls">
      <BaseTextInput
        placeholder="Buscar"
        style="width: 100%; border-radius: 0"
        @input="handleInput"
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
    flex-flow: row nowrap;
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
