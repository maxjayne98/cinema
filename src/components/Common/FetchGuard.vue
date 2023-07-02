<template>
  <div class="guard">
    <slot v-if="error" name="error">
      <div class="guard__error">
        <p>
          {{ error }}
        </p>
        <button v-if="retry" class="guard__retry" @click="retry">retry</button>
      </div>
    </slot>
    <slot v-else-if="isLoading" name="loading">
      <Loading />
    </slot>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Common/Loading.vue'
withDefaults(
  defineProps<{
    error?: string
    isLoading?: boolean
    retry?: () => void
  }>(),
  {
    error: undefined,
    isLoading: false,
    retry: undefined
  }
)
</script>

<style scoped lang="scss">
.guard {
  width: 100%;
  &__error {
    font-size: 1.6rem;
    text-align: center;
    color: var(--theme-primary);
    padding: 6rem 1rem;
  }
  &__retry {
    text-decoration: underline;
  }
}
</style>
