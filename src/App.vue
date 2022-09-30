<script setup lang="ts">
import TopMenu from './components/TopMenu.vue'
import VueFeather from 'vue-feather'
</script>

<template>
  <TopMenu />
  <main class="main">
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition name="slide" mode="out-in">
          <div :key="route.name" style="height: 100%">
            <KeepAlive>
              <Suspense>
                <component :is="Component"></component>
                <template #fallback>
                  <div class="loader">
                    <vue-feather type="loader" size="4rem" animation="spin" />
                  </div>
                </template>
              </Suspense>
            </KeepAlive>
          </div>
        </Transition>
      </template>
    </RouterView>
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

*:focus {
  outline: none;
}

#app {
  @extend %font-content;
}

.main {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
}

.loader {
  position: absolute;
  top: 50%;
  left: calc(50% - 4rem);
}

.slide-enter-active {
  .loader {
    display: none;
  }
}

.slide-enter-active,
.slide-enter-leave {
  transition: opacity 200ms, transform 200ms;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
