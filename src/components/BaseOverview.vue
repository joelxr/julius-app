<script setup lang="ts">
import { money, quantity } from '../formatters'

interface BaseOverviewProps {
  total?: number
  count?: number
  min?: number
  max?: number
  avg?: number
  frequency?: number
}

defineProps<BaseOverviewProps>()
</script>
<template>
  <h3>Visão geral</h3>
  <div :class="$style.overview">
    <div :class="$style.tile">
      <div :class="$style.title"> Total </div>
      <div :class="$style.value">
        {{ money.format(total || 0) }}
      </div>
      <div :class="$style.footer"> {{ count || 0 }} item(s) </div>
    </div>
    <div :class="$style.tile">
      <div :class="$style.title"> Menor </div>
      <div :class="$style.value">
        {{ money.format(min || 0) }}
      </div>
    </div>
    <div :class="$style.tile">
      <div :class="$style.title"> Maior </div>
      <div :class="$style.value">
        {{ money.format(max || 0) }}
      </div>
    </div>
    <div :class="$style.tile">
      <div :class="$style.title"> Média </div>
      <div :class="$style.value">
        {{ money.format(avg || 0) }}
      </div>
    </div>
    <div :class="$style.tile">
      <div :class="$style.title"> Frequência </div>
      <div :class="$style.value"> {{ quantity.format(frequency || 0) }}d </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../design';

.overview {
  display: flex;
  flex-flow: row nowrap;
  gap: $gap;
  justify-content: center;

  .tile {
    margin: $gap;
    text-align: right;

    .title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .value {
      font-size: 1.6rem;
      color: $blue;
    }
  }
}
</style>
