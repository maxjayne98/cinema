<template>
  <span :class="['badge']">
    <slot />
  </span>
</template>

<script setup></script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #f9fafb;
  color: #4b5563;
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 500;
  align-items: center;
  border-radius: 0.375rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-inset: inset;
}
</style>
