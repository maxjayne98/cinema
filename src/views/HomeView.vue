<template>
  <div>
    <Banners :banners="banners.filter(Boolean)">
      <template #default="{ show }">
        <div class="banner__details">
          <RouterLink :to="{ name: 'shows-id', params: { id: show.id } }" class="card__covers">
            <p class="banner__details__name">
              {{ extractTextFromHtmlNode(show?.name) }}
              {{ show.premiered?.split('-')[0] }}
            </p>
            <p class="banner__details__summary">
              {{ extractTextFromHtmlNode(show?.summary) }}
            </p>
          </RouterLink>
        </div>
      </template>
    </Banners>
    <PageContainer>
      <section class="section">
        <div>
          <FetchGuard :is-loading="!shows.length" :error="error">
            <ShowsSlider v-for="(value, key) in topGenresShows" :key="key" :title="key">
              <SwiperSlide v-for="show in (value as Array<Show>).slice(0, 10)" :key="show.id">
                <MovieCard :show="show" />
              </SwiperSlide>
            </ShowsSlider>
          </FetchGuard>
        </div>
      </section>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { RouterLink } from 'vue-router'
import MovieCard from '@/components/Common/MovieCard.vue'
import ShowsSlider from '@/components/Common/ShowsSlider.vue'
import PageContainer from '@/components/Common/PageContainer.vue'
import Banners from '@/components/Pages/Home/Banners.vue'
import FetchGuard from '@/components/Common/FetchGuard.vue'
import { getShowsByPage } from '@/services/shows'
import type { Show } from '@/models/types'
import { extractTextFromHtmlNode } from '@/utils/helpers'

const TOP_GENRE_SIZE = 10
const shows = ref<Array<Show>>([])
const error = ref<string | null>(null)

const categorizedShows = computed(() => {
  return shows.value?.reduce((acc, current) => {
    const genre = getShowGenreIndex(current)
    if (!genre) return acc

    if (acc[genre]) {
      return { ...acc, [genre]: [current, ...acc[genre]] }
    } else {
      return {
        ...acc,
        [genre]: [current]
      }
    }
  }, {})
})

const topGenresShows = computed(() => {
  return (Object.entries(categorizedShows.value) as Array<[string, Array<Show>]>).reduce(
    (acc, current) => {
      if (current[1].length > TOP_GENRE_SIZE) return { ...acc, [current[0]]: current[1] }
      return acc
    },
    {}
  )
})

const banners = computed(() => {
  return (Object.values(topGenresShows.value) as Array<Show>).map(
    (show) => show[0].image.original && { cover: show[0].image.original, show: show[0] }
  )
})

function getShowGenreIndex(show: Show) {
  return show['genres'][0]
}

async function fetchShows() {
  try {
    const { data } = await getShowsByPage(1)
    const { data: data2 } = await getShowsByPage(2)
    shows.value = [...data, ...data2]
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

onMounted(() => fetchShows())
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
}
.slider-container {
  width: 100%;
}
.show-con {
  display: inline;
}
.carousel {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.banner__details {
  position: absolute;
  left: 3rem;
  z-index: 999;
  bottom: 18rem;
  color: white;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.16));
  &__name {
    font-size: 4.8rem;
    font-weight: 700;
    width: 80vw;
  }
  &__summary {
    font-size: 2.4rem;
    width: 50%;
    width: 60vw;
    text-align: left;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
