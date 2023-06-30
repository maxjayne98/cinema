<template>
  <div>
    <Banners />
    <section class="section">
      <div class="page__container">
        <ShowsSlider title="Drama">
          <SwiperSlide v-for="show in shows.slice(0, 10)" :key="show.id">
            <MovieCard :show="show" />
          </SwiperSlide>
        </ShowsSlider>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import MovieCard from '@/components/Common/MovieCard.vue'
import ShowsSlider from '@/components/Common/ShowsSlider.vue'
import Banners from '@/components/Pages/Home/Banners.vue'
import { getShowsByPage } from '@/services/shows'
import { Show } from '@/models/types'

const shows = ref<Array<Show>>([])
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

<style>
.page {
  /* max-width: 100rem; */
  margin: 0 auto;
}
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
