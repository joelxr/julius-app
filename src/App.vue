<script setup lang="ts"></script>

<template>
  <nav :class="$style.classA">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </nav>

  <main>
    <router-view></router-view>
  </main>
</template>

<style module lang="scss">
.classA {
  margin: 0;
  border: none;
}
</style>
