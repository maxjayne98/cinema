<template>
  <div class="banners">
    <div class="banners__background-container">
      <template v-for="({ cover, show }, index) in banners" :key="`${cover}_${index}`">
        <transition name="fade">
          <img v-if="currentBannerIndex === index" class="banners__background" :src="cover" lazy />
        </transition>
        <transition name="fade">
          <slot v-if="currentBannerIndex === index" :show="show" />
        </transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/models/types'
import { onBeforeMount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    banners?: Array<{ cover: string; show?: Show }>
    interval: boolean
  }>(),
  { interval: true, banners: undefined }
)
const currentBannerIndex = ref(0)
const intervalTimer = ref<any>(null)

onMounted(() => {
  if (props.interval) {
    intervalTimer.value = setInterval(() => {
      if (currentBannerIndex.value + 1 === props.banners?.length) currentBannerIndex.value = 0
      else currentBannerIndex.value += 1
    }, 4000)
  }
})

onBeforeMount(() => {
  clearInterval(intervalTimer.value)
})
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
