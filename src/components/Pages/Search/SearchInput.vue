<template>
  <div>
    <form class="input-container" @submit="formSubmit">
      <button class="input__button" type="submit">
        <MagnifyingGlassIcon class="input__button__icon" />
      </button>
      <input v-model="query" class="input" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const props = defineProps<{
  submit: (query: string) => void
  defaultQuery?: string
}>()

const query = ref(props.defaultQuery)

function formSubmit(e: any) {
  e.preventDefault()

  query.value && props.submit(query.value)
}
</script>

<style lang="scss" scoped>
.input {
  background: transparent;
  width: 100%;
  height: 100%;
  margin-left: 0.6rem;
  font-size: 1.8rem;
  color: var(--font-color-secondary);

  &-container {
    border-radius: 4rem;
    width: 80vw;
    min-width: 35rem;
    max-width: 105rem;
    background-color: var(--background-secondary);
    padding: 0.5rem;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6rem;
    box-shadow: var(--shadow);
  }

  &__button {
    min-width: 5rem;
    min-height: 5rem;
    background-color: var(--theme-primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    transition: all 0.2s;
    transform-origin: center;
    align-items: center;

    &:hover {
      background-color: var(--theme-primary-hover);
    }

    &:active {
      transform: translateY(0.1rem);
    }

    &__icon {
      width: 3.2rem;
      height: 3.2rem;
      color: var(--font-color-secondary);
      transition: all 0.5s;
    }
  }
}
</style>
