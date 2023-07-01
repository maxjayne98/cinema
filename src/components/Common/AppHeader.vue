<template>
  <header :class="['header', { 'header--is-top': isTop }]">
    <CinemaLogo class="header__logo" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CinemaLogo from '@/components/Icons/CinemaIcon.vue'
const isTop = ref(window.scrollY === 0)

window.addEventListener('scroll', function () {
  if (window.scrollY == 0) {
    isTop.value = true
  } else {
    isTop.value = false
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 2rem;
  background-color: rgba(10, 13, 16, 0.6);
  background-color: rgba(var(--background-secondary-number), 0.6);
  -webkit-backdrop-filter: blur(6px) opacity(1);
  backdrop-filter: blur(6px) opacity(1);
  -webkit-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #0a0d10),
      to(rgba(0, 0, 0, 0))
    );
    background-image: -webkit-linear-gradient(top, #0a0d10 0, rgba(0, 0, 0, 0));
    background-image: -o-linear-gradient(top, #0a0d10 0, rgba(0, 0, 0, 0));
    background-image: linear-gradient(180deg, #0a0d10 0, rgba(0, 0, 0, 0));
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, rgba(var(--background-secondary-number), 1)),
      to(rgba(0, 0, 0, 0))
    );
    background-image: -webkit-linear-gradient(
      top,
      rgba(var(--background-secondary-number), 1) 0,
      rgba(0, 0, 0, 0)
    );
    background-image: -o-linear-gradient(
      top,
      rgba(var(--background-secondary-number), 1) 0,
      rgba(0, 0, 0, 0)
    );
    background-image: linear-gradient(
      180deg,
      rgba(var(--background-secondary-number), 1) 0,
      rgba(0, 0, 0, 0)
    );
    opacity: 0;
    z-index: -1;
    -webkit-transition: all 0.6s ease;
    -o-transition: all 0.6s ease;
    transition: all 0.6s ease;
  }

  &__logo {
    width: 13rem;
    height: auto;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  }

  &--is-top {
    background-color: rgba(10, 13, 16, 0);
    background-color: rgba(var(--background-secondary-number), 0);
    -webkit-backdrop-filter: blur(8px) opacity(0);
    backdrop-filter: blur(8px) opacity(0);
    &::before {
      opacity: 1;
    }
  }
}
</style>
