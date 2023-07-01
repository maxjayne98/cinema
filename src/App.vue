<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/Common/AppHeader.vue'
</script>

<template>
  <div class="page">
    <AppHeader />
    <main class="main">
      <div class="page__container">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
