import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/models/types'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const favorites = ref<Record<number, Show>>({})

    function addToFavorites(item: Show) {
      if (favorites.value[item.id]) throw new Error('Repeated')
      favorites.value[item.id] = item
    }

    function removeFromFavorites({ id }: Show) {
      const item = favorites.value[id]
      if (item) delete favorites.value[id]
      else throw new Error('No match')
    }

    return { favorites, addToFavorites, removeFromFavorites }
  },
  { persist: true }
)
