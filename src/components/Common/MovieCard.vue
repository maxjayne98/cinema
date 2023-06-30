<script setup lang="ts">
import { Show } from '@/models/types'
import { ref } from 'vue'
interface Props {
  show: Show
}

defineProps<Props>()

const isHovered = ref<boolean>(false)

function mouseEnter() {
  if (!isHovered.value) isHovered.value = true
}

function mouseLeave() {
  if (isHovered.value) isHovered.value = false
}
function extractSummary(summary: string) {
  var span = document.createElement('span')
  span.innerHTML = summary
  return span.textContent || span.innerText
}
</script>

<template>
  <div class="card__container">
    <div class="card__badge card__badge--top">{{ show.name }}</div>
    <div class="card__covers-container">
      <div class="card__covers" @mouseover="mouseEnter">
        <img :src="show.image.medium" class="cover card__cover--main" />
        <img
          :src="show.image.medium"
          :class="['cover card__cover--second', { 'card--is-hovered': isHovered }]"
        />
        <img
          :src="show.image.medium"
          :class="['cover card__cover--third', { 'card--is-hovered': isHovered }]"
        />
      </div>
      <transition name="fade">
        <div v-if="isHovered" class="card__info" @mouseover="mouseEnter" @mouseleave="mouseLeave">
          <p class="card__info-text">
            {{ extractSummary(show.summary) }}
          </p>
          <ul class="card-info__genres">
            <li v-for="genre in show.genres.slice(0, 3)" :key="genre" class="card-info__genre">
              {{ genre }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="card__badge card__badge--bottom">
      {{ show.rating.average || '-' }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card__badge {
  background-color: black;
  color: white;
  margin: 0 0.5rem;
  text-align: center;
  padding: 0.125rem;
}

.card__badge--top {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.card__badge--bottom {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  z-index: 5;
}

.cover {
  height: 16rem;
  width: 100%;
  box-shadow: 0 0 1.8rem -0.4rem #0a090c !important;
  border-radius: 0.5rem;
}

.card {
  margin: 1rem;
  display: flex;
  align-items: end;
  font-size: 0.875rem;
}

.card__cover--main {
  z-index: 3;
  position: relative;
}

.card__cover--second {
  z-index: 2;
  top: 0.25rem;
  right: -0.25rem;
  position: absolute;
  transition: 200ms ease-in all;
}

.card__cover--third {
  z-index: 1;
  top: 0.5rem;
  right: -0.5rem;
  position: absolute;
  transition: 180ms ease-in all;
}

.card--is-hovered {
  top: 0;
  right: 0;
}

.card__container {
  padding: 1rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.card__covers {
  position: relative;
}

.card__covers-container {
  position: relative;
  cursor: pointer;
  border-radius: 0.5rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.card__info {
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  inset: 0;
  color: white;
  z-index: 6;
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card__info-text {
  text-align: center;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info__genres {
  display: flex;
  list-style-type: disc;
  font-size: 0.725rem;
  margin: 0rem 0.5rem 2rem;
}

.card-info__genre {
  margin: 0 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
