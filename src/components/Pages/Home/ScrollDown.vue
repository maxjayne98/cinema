<template>
  <div class="scroll-down__container">
    <div class="scroll-down"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.scroll-down {
  &__container {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  width: 4.8rem;
  height: 4.8rem;
  border: 2px solid var(--theme-primary);
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 1.4rem;
    left: 1.6rem;

    width: 1.2rem;
    height: 1.2rem;
    border-left: 2px solid var(--theme-primary);
    border-bottom: 2px solid var(--theme-primary);
    transform: rotate(-45deg);
  }

  @keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }

  @-webkit-keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }
}
</style>
