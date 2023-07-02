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
        <FetchGuard :is-loading="!shows.length" :error="error">
          <div class="search__list">
            <div v-for="{ show } in shows" :key="show.id" class="search__list-item">
              <MovieCard :show="show" />
            </div>
          </div>
        </FetchGuard>
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
import FetchGuard from '@/components/Common/FetchGuard.vue'
import type { Show } from '@/models/types'

import { getShowsByQuery } from '@/services/shows'
const shows = ref<Array<{ score: number; show: Show }>>([])
const error = ref<string | null>('')

async function searchShows() {
  try {
    const { data } = await getShowsByQuery('man')
    shows.value = data
  } catch (err: any) {
    if ('response' in err) {
      if ('data' in err.response && err.response.data) {
        error.value = `${err.response.data.name} ${err.response.data.message} ${err.response.data.status}`
      } else {
        error.value = err.message
      }
    }
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
