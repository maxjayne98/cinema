<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="page__container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main {
  flex-grow: 1;
  width: 100%;
  display: flex;
}
.page__container {
  width: 100%;
}
</style>
