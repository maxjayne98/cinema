<template>
  <div class="card__container">
    <div class="card__badge card__badge--top">{{ show.name }}</div>
    <RouterLink
      :to="{ name: 'shows-id', params: { id: show.id } }"
      class="card__covers"
      @mouseover="mouseEnter"
    >
      <div class="card__covers-container">
        <img
          :src="show.image?.medium || show.image?.original"
          class="card__cover card__cover--main"
          lazy
        />
        <img
          :src="show.image?.medium || show.image?.original"
          :class="['card__cover card__cover--second', { 'card--is-hovered': isHovered }]"
          lazy
        />
        <img
          :src="show.image?.medium || show.image?.original"
          :class="['card__cover card__cover--third', { 'card--is-hovered': isHovered }]"
          lazy
        />
        <transition name="fade">
          <div v-if="isHovered" class="card__info" @mouseover="mouseEnter" @mouseleave="mouseLeave">
            <p class="card__info-text">
              {{ extractTextFromHtmlNode(show.summary) }}
            </p>
            <ul class="card__genres">
              <li v-for="genre in show.genres.slice(0, 3)" :key="genre" class="card__genre">
                {{ genre }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </RouterLink>

    <div class="card__badge card__badge--bottom">
      <div>
        <IMDBIcon class="card__badge__icon" />
        {{ show.rating?.average || '-' }}
      </div>
      <FavoriteMovieIcon :show="show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { extractTextFromHtmlNode } from '@/utils/helpers'
import type { Show } from '@/models/types'
import IMDBIcon from '@/components/Icons/IMDBIcon.vue'
import FavoriteMovieIcon from '@/components/Common/FavoriteMovieIcon.vue'

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
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  display: flex;
  align-items: end;
  font-size: 0.875rem;

  &__cover {
    height: 20rem;
    width: 100%;
    box-shadow: var(--shadow);
    border-radius: 0.5rem;
  }

  &__badge {
    background-color: var(--scrollbar-front);
    color: white;
    margin: 0 0.5rem;
    text-align: center;
    padding: 0.25rem;

    &--top {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      font-weight: 600;
    }

    &--bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      z-index: 5;
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
    }

    &__icon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.4rem;
      display: inline;
    }
  }
  &__cover {
    &--main {
      z-index: 3;
      position: relative;
    }

    &--second {
      z-index: 2;
      top: 0.25rem;
      right: -0.25rem;
      position: absolute;
      transition: 200ms ease-in all;
    }

    &--third {
      z-index: 1;
      top: 0.5rem;
      right: -0.5rem;
      position: absolute;
      transition: 180ms ease-in all;
    }
  }

  &--is-hovered {
    top: 0;
    right: 0;
  }

  &__container {
    padding: 1rem;
    width: 18rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  &__covers {
    position: relative;
    &-container {
      position: relative;
      cursor: pointer;
      border-radius: 0.5rem;
    }
  }

  &__info {
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

    &-text {
      text-align: center;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__genres {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style-type: disc;
    font-size: 1rem;
    margin: 0rem 0.5rem;
  }

  &__genre {
    margin: 0 0.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 992px) {
  .card__container {
    width: 14rem;
  }
  .card__cover {
    height: 17rem;
  }
  .card__badge--top {
    font-size: 1.2rem;
  }
  .card__badge--bottom {
    font-size: 1rem;
  }
}
</style>
