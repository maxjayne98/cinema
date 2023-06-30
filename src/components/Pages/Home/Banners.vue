<template>
  <div class="banners">
    <div class="banners__background-container">
      <img
        class="banners__background"
        src="https://static.tvmaze.com/uploads/images/original_untouched/303/758509.jpg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Show } from '@/models/types.ts'
defineProps<{
  toppicks: Array<Show>
}>()
</script>

<style lang="scss" scoped>
.banners {
  position: relative;
  min-height: 100vh;
  z-index: 1;
  &__background-container {
    position: absolute;
    height: 100%;
    inset: 0;
    z-index: -1;
    user-select: none;
    flex-flow: column nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    &::after {
      content: '';
      left: 0;
      top: 0;
      background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0, #0d1113),
        to(rgba(0, 0, 0, 0))
      );
      background-image: -webkit-linear-gradient(bottom, #0d1113 0, rgba(0, 0, 0, 0));
      background-image: -o-linear-gradient(bottom, #0d1113 0, rgba(0, 0, 0, 0));
      background-image: linear-gradient(0deg, #0d1113 0, rgba(0, 0, 0, 0));
      background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0, var(--background-secondary-lighter)),
        to(rgba(0, 0, 0, 0))
      );
      background-image: -webkit-linear-gradient(
        bottom,
        var(--background-secondary-lighter) 0,
        rgba(0, 0, 0, 0)
      );
      background-image: -o-linear-gradient(
        bottom,
        var(--background-secondary-lighter) 0,
        rgba(0, 0, 0, 0)
      );
      background-image: linear-gradient(
        0deg,
        var(--background-secondary-lighter) 0,
        rgba(0, 0, 0, 0)
      );
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    transition: all 1s;
  }
}
</style>
