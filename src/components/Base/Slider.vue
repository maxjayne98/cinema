<template>
  <swiper
    :grabCursor="true"
    :slidesPerView="'auto'"
    :navigation="true"
    :pagination="true"
    :modules="modules"
    :breakpoints="{
      '992': {
        slidesPerView: 4,
        spaceBetween: 30
      },
      '1200': {
        slidesPerView: 5,
        spaceBetween: 20
      },
      '1400': {
        slidesPerView: 5,
        spaceBetween: 50
      }
    }"
  >
    <slot />
  </swiper>
</template>
<script setup lang="ts">
import { Swiper } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css/effect-coverflow'
import { Navigation } from 'swiper'
const modules = [Navigation]
</script>
<style>
.swiper {
  width: 100%;
  height: 22rem;
}
.swiper-slide {
  display: flex;
  width: auto;
}
@media screen and (min-width: 768px) {
  .swiper-slide {
    justify-content: center;
  }
}
</style>
