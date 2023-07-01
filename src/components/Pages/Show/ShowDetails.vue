<template>
  <div class="show-details">
    <div class="">
      <h2 class="show-details__title">{{ show?.name }} {{ show?.premiered.split('-')[0] }}</h2>
    </div>
    <ul class="show-details__producer-info">
      <li class="show-details__producer-site">
        <a :href="show?.network.officialSite">
          {{ show?.network.name }}
        </a>
      </li>
      <li class="show-details__time">{{ show?.runtime }}m</li>
    </ul>
    <ul class="show-details__genre-list">
      <li v-for="genre in show?.genres" :key="genre" class="show-details__genre">
        <Badge class="show-details__genre-badge"> {{ genre }} </Badge>
      </li>
    </ul>
    <ul class="show-details__rating-list">
      <li class="show-details__rating">
        <section>
          <a
            :href="`https://www.imdb.com/title/${show?.externals.imdb}`"
            target="_blank"
            class="show-details__source-link"
            ><div class="show-details__source-link__container">
              <IMDBIcon class="show-details__source-logo" />
              <div>
                <p class="show-details__source-rating">{{ show?.rating.average }}</p>
                <p class="show-details__source-view">(825.7K)</p>
              </div>
            </div>
          </a>
        </section>
      </li>
    </ul>
    <!-- <ul class="figcaption-child">
      <li>
        <section big30nama="" class="ratings" data-v-298af1e4="">
          <div class="ratebox" data-v-298af1e4="">
            <p class="bd-normal" data-v-298af1e4="">امتیاز بدهید:</p>
          </div>
        </section>
      </li>
    </ul> -->

    <div>
      <div>
        <div>
          <p class="show-details__description">
            {{ extractTextFromHtmlNode(show?.summary) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '@/components/Base/Badge.vue'
import IMDBIcon from '@/components/Icons/IMDBIcon.vue'
import { extractTextFromHtmlNode } from '@/utils/helpers'
import type { Show } from '@/models/types'
defineProps<{
  show: Show
}>()
</script>

<style lang="scss" scoped>
.show-details {
  padding: 9.6rem 0 0;
  &__title {
    font-size: 3.2rem;
    font-weight: 700;
  }
  &__producer-info {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 500;
    & > * {
      margin: 0 0.4rem;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__genre {
    &-list {
      margin: 1rem 0;
    }
    &-badge {
      font-size: 1.6rem;
      padding: 0.5rem 0.5rem;
    }
  }

  &__rating {
    &-list {
      display: flex;
      margin: 1.6rem 0;
    }
  }
  &__source {
    &-logo {
      width: 3.2rem;
      height: 3.2rem;
      margin-right: 1.4rem;
      border-radius: 50%;
    }
    &-rating {
      font-size: 1.6rem;
      font-weight: 600;
    }
    &-view {
      font-size: 1.2rem;
      color: var(--font-color-secondary);
    }

    &-link {
      font-size: 1.6rem;
      &__container {
        display: flex;
        align-items: center;
        text-align: center;
      }
    }
  }
  &__description {
    text-align: left;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
