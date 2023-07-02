<template>
  <div v-if="message" class="no-data">
    <slot>
      {{ message }}
    </slot>
  </div>
  <div v-else class="no-data">No Data</div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string
  }>(),
  { message: '' }
)
</script>

<style scoped>
.no-data {
  font-size: 4.8rem;
  font-weight: 600;
  padding: 6.4rem;
  text-align: center;
  color: var(--theme-primary);
}
</style>
