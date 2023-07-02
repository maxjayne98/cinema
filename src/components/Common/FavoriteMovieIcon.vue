<template>
  <button v-if="isFavorite" @click="() => favoritesStore.removeFromFavorites(show)">
    <HeartIcon class="heart" />
  </button>
  <button v-else>
    <OutlineHeartIcon class="heart" @click="() => favoritesStore.addToFavorites(show)" />
  </button>
</template>

<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import type { Show } from '@/models/types'

const props = defineProps<{
  show: Show
}>()

const isFavorite = computed(() => !!favoritesStore.favorites[props.show.id])
import { useFavoritesStore } from '@/stores/favoritesStore'
const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.heart {
  width: 2.4rem;
  height: 2.4rem;
  color: red;
  cursor: pointer;
}
</style>
