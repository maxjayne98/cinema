<template>
  <header :class="['header', { 'header--is-top': isTop }]">
    <RouterLink :to="{ name: 'home' }">
      <CinemaLogo class="header__logo" />
    </RouterLink>
    <transition name="slide-left-in">
      <form v-if="route.name !== 'search'" class="header__input-container" @submit="searchOnSubmit">
        <button type="submit">
          <MagnifyingGlassIcon class="header__input__icon" />
        </button>
        <transition name="slide-left-in">
          <input v-if="isSearchInputVisible" v-model="query" class="header__input" />
        </transition>
      </form>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import CinemaLogo from '@/components/Icons/CinemaIcon.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const isTop = ref(window.scrollY === 0)
const route = useRoute()
const router = useRouter()
const isSearchInputVisible = ref(false)
const query = ref('')

window.addEventListener('scroll', function () {
  if (window.scrollY == 0) {
    isTop.value = true
  } else {
    isTop.value = false
  }
})

function searchOnSubmit(event: any) {
  event.preventDefault()
  if (isSearchInputVisible.value && query.value) {
    router.push({ name: 'search', query: { q: query.value } })
    query.value = ''
  }
  isSearchInputVisible.value = !isSearchInputVisible.value
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  align-items: center;
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
    margin-right: 3.2rem;
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
  &__input {
    height: 3.6rem;
    padding: 0.4rem 0.8rem 0.4rem 3.2rem;
    border: 1px solid var(--font-color-primary);
    color: var(--font-color-primary);
    border-radius: 0.8rem;
    background-color: transparent;
    position: absolute;
    left: -0.4rem;
    min-width: 18rem;
    max-width: 30rem;
    width: 80%;
    &-container {
      display: flex;
      align-items: center;
      position: relative;
      margin-left: 0.4rem;
    }
    &__icon {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--font-color-primary);
      cursor: pointer;
      z-index: 1;
    }
  }
}

.slide-left-in-leave-active,
.slide-left-in-enter-active {
  transition: 0.2s;
}

.slide-left-in-enter-from,
.slide-left-in-leave-to {
  transform: translate(-2rem, 0);
  opacity: 0;
}
</style>
