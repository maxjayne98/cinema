<template>
  <div>
    <Banners />
    <PageContainer>
      <section class="section">
        <div>
          <ShowsSlider v-for="(value, key) in topGenresShows" :key="key" :title="key">
            <SwiperSlide v-for="show in (value as Array<Show>).slice(0, 10)" :key="show.id">
              <MovieCard :show="show" />
            </SwiperSlide>
          </ShowsSlider>
        </div>
      </section>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import MovieCard from '@/components/Common/MovieCard.vue'
import ShowsSlider from '@/components/Common/ShowsSlider.vue'
import PageContainer from '@/components/Common/PageContainer.vue'
import Banners from '@/components/Pages/Home/Banners.vue'
import { getShowsByPage } from '@/services/shows'
import type { Show } from '@/models/types'

const TOP_GENRE_SIZE = 10
const shows = ref<Array<Show>>([])

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

function getShowGenreIndex(show: Show) {
  return show['genres'][0]
}

async function fetchShows() {
  try {
    const { data } = await getShowsByPage(1)
    const { data: data2 } = await getShowsByPage(2)
    shows.value = [...data, ...data2]
  } catch (error) {
    console.log('🚀 ~ file: TheWelcome.vue:17 ~ fetchShows ~ error:', error)
  }
}

onMounted(() => fetchShows())
</script>

<style scoped>
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
</style>
