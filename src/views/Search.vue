<template>
  <div class="search">
    <section class="search__first-section">
      <Banners
        :banners="[
          { cover: 'https://static.tvmaze.com/uploads/images/original_untouched/226/566476.jpg' }
        ]"
        :interval="false"
      />
      <div class="search__input-container">
        <SearchInput :submit="searchShows" :default-query="(query as string)" />
      </div>
    </section>
    <section>
      <PageContainer>
        <FetchGuard :is-loading="isLoading" :error="error">
          <template v-if="Array.isArray(shows)">
            <div v-if="shows?.length" class="search__list">
              <div
                v-for="{ show } in shows.slice(0, page * PAGE_SIZE)"
                :key="show.id"
                class="search__list-item"
              >
                <MovieCard :show="show" />
              </div>
            </div>
            <NoData v-else message="No result with your query." />
          </template>
          <NoData v-else message="Please search." />
        </FetchGuard>
        <div ref="root" />
      </PageContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Banners from '@/components/Pages/Home/Banners.vue'
import SearchInput from '@/components/Pages/Search/SearchInput.vue'
import PageContainer from '@/components/Common/PageContainer.vue'
import MovieCard from '@/components/Common/MovieCard.vue'
import FetchGuard from '@/components/Common/FetchGuard.vue'
import NoData from '@/components/Common/NoData.vue'
import { getShowsByQuery } from '@/services/shows'
import useIndefiniteScroll from '@/composables/useIndefiniteScroll'
import type { Show } from '@/models/types'
const PAGE_SIZE = 20

const route = useRoute()

const shows = ref<Array<{ score: number; show: Show }> | null>(null)
const error = ref<string>('')
const isLoading = ref(false)
const query = ref(route.query.q || '')
const root = ref(null)
const page = ref(1)

useIndefiniteScroll(updatePage, root, { rootMargin: '40px', threshold: 0.1 })

function updatePage() {
  page.value += 1
}

async function searchShows(query: string) {
  isLoading.value = true
  page.value = 1
  try {
    const { data } = await getShowsByQuery(query)
    shows.value = Array(10).fill(data).flat()
  } catch (err: any) {
    if ('response' in err) {
      if ('data' in err.response && err.response.data) {
        error.value = `${err.response.data.name} ${err.response.data.message} ${err.response.data.status}`
      } else {
        error.value = err.message
      }
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => query.value && searchShows(query.value as string))
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
