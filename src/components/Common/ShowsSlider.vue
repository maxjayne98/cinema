<template>
  <div>
    <p class="slider__title">
      {{ title }}
      <slot name="titleIcon" />
    </p>
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
          slidesPerView: 6,
          spaceBetween: 30
        }
      }"
      class="mySwiper"
    >
      <slot />
    </swiper>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
}
import { Swiper } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css/effect-coverflow'
import { Navigation } from 'swiper'
const modules = [Navigation]
defineProps<Props>()
</script>
<style scoped lang="scss">
.slider {
  &__title {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--font-color-primary);
  }
}
@media screen and (max-width: 1600px) {
  .slider {
    &__title {
      padding: 0 3.2rem;
    }
  }
}
</style>
<style>
.swiper {
  width: 100%;
  height: 26rem;
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
