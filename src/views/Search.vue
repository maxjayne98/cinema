<template>
  <div class="search">
    <section class="search__first-section">
      <Banners />
      <div class="search__input-container">
        <SearchInput />
      </div>
    </section>
    <section>
      <PageContainer>
        <Guard>
          <div class="search__list">
            <div v-for="{ show } in shows" :key="show.id" class="search__list-item">
              <MovieCard :show="show" />
            </div>
          </div>
        </Guard>
      </PageContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Banners from '@/components/Pages/Home/Banners.vue'
import SearchInput from '@/components/Pages/Search/SearchInput.vue'
import PageContainer from '@/components/Common/PageContainer.vue'
import MovieCard from '@/components/Common/MovieCard.vue'
import Guard from '@/components/Common/FetchGuard.vue'
import type { Show } from '@/models/types'

import { getShowsByQuery } from '@/services/shows'
const shows = ref<Array<{ score: number; show: Show }>>([])

async function searchShows() {
  try {
    const { data } = await getShowsByQuery('man')
    shows.value = data
    console.log('🚀 ~ file: Search.vue:16 ~ searchShows ~ response:', data)
  } catch (error) {
    console.log('🚀 ~ file: Search.vue:33 ~ searchShows ~ error:', error)
  }
}

onMounted(() => searchShows())
</script>

<style lang="scss" scoped>
.search {
  &__first-section {
    position: relative;
  }

  &__input-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  &__list {
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    -moz-column-gap: 1rem;
    column-gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 480px) {
    .search__list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 640px) {
    .search__list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .search__list {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .search__list {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
}
</style>
