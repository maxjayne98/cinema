<template>
  <div class="input-container">
    <input class="input" />
    <button class="input__button"></button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.input {
  background: transparent;
  width: 100%;
  height: 100%;
  margin-left: 5.5rem;
  font-size: 1.8rem;
  color: var(--font-color-secondary);

  &-container {
    border-radius: 3rem;
    width: 80vw;
    min-width: 35rem;
    max-width: 105rem;
    background-color: var(--background-secondary);
    padding: 1rem;
    overflow: hidden;
    position: relative;
    height: 6rem;
    box-shadow: var(--shadow);
  }

  &__button {
    width: 5rem;
    height: 5rem;
    background-color: var(--theme-primary);
    position: absolute;
    left: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;

    &:hover {
      background-color: var(--theme-primary-hover);
    }
  }
}
</style>
