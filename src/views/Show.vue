<template>
  <div class="show">
    <section class="main-top">
      <Guard :error="error">
        <article id="single-30nama" class="main-article">
          <!---->
          <section class="background">
            <main class="main-content-single">
              <div class="gradient" />
              <img
                :src="bg?.resolutions['original'].url"
                :alt="info?.name"
                class="img loaded"
                lazy
              />
            </main>
          </section>
          <figure>
            <figcaption>
              <main class="main-content">
                <section class="figcaption-content">
                  <ShowDetails v-if="info" :show="info" />
                </section>
              </main>
            </figcaption>
          </figure>
        </article>
      </Guard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// import { useRouter } from 'vue-router'
import { getShowInfo, getShowImages } from '@/services/shows'
import ShowDetails from '@/components/Pages/Show/ShowDetails.vue'
import Guard from '@/components/Common/FetchGuard.vue'

import { findResolution } from '@/utils/helpers'
import type { Show, Image } from '@/models/types'

const {
  params: { id }
} = useRoute()
// const router = useRouter()

const info = ref<Show | null>(null)
const bg = ref<Image | null>(null)
const error = ref<string>('')

onMounted(() => fetchShowInfo())

async function fetchShowInfo() {
  if (id) {
    try {
      const { data: showInfo } = await getShowInfo(Number(id))
      const { data: images } = await getShowImages(Number(id))
      info.value = showInfo
      console.log('🚀 ~ file: Show.vue:206 ~ fetchShowInfo ~ info:', info)
      const img =
        findResolution(images, { height: 1080, width: 1920 }) ||
        findResolution(images, { width: 1280, height: 720 })
      if (img) bg.value = img
    } catch (error: any) {
      if ('response' in error) {
        error.value = `${error.response.data.name} ${error.response.data.message} ${error.response.data.status}`
        console.log('🚀 ~ file: Show.vue:71 ~ fetchShowInfo ~ error.value :', error.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.show {
  color: white;
}

.guard {
  min-height: 30rem;
}
.main-top {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column nowrap;
  -ms-flex-direction: column nowrap;
  flex-direction: column nowrap;
  min-height: calc(100vh - 18.3rem);
}

.main-article {
  position: relative;
  background-color: #0a0d10;
  background-color: var(--background-secondary);
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.background {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
}

.main-content-single {
  width: 100%;
  height: 100%;
  max-width: 160rem;
  margin: 0 auto;
}

.main-top .main-article .background .loaded {
  opacity: 1 !important;
}

.main-top .main-article .background .img {
  position: absolute;
  width: calc(32rem + 50%);
  height: 100%;
  left: calc(50% - 32rem);
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: right center;
  object-position: right center;
  opacity: 0;
  will-change: opacity;
  -webkit-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  z-index: 6;
}

.main-top .main-article .background .gradient {
  position: absolute;
  width: calc(80rem + 50%);
  height: 100%;
  left: calc(50% - 80rem);
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(30%, #0a0d10),
    to(rgba(10, 13, 16, 0))
  );
  background: -webkit-linear-gradient(right, #0a0d10 30%, rgba(10, 13, 16, 0));
  background: -o-linear-gradient(right, #0a0d10 30%, rgba(10, 13, 16, 0));
  background: linear-gradient(90deg, #0a0d10 30%, rgba(10, 13, 16, 0));
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(30%, var(--background-secondary)),
    to(rgba(var(--background-secondary-number), 0))
  );
  background: -webkit-linear-gradient(
    right,
    var(--background-secondary) 30%,
    rgba(var(--background-secondary-number), 0)
  );
  background: -o-linear-gradient(
    right,
    var(--background-secondary) 30%,
    rgba(var(--background-secondary-number), 0)
  );
  background: linear-gradient(
    90deg,
    var(--background-secondary) 30%,
    rgba(var(--background-secondary-number), 0)
  );
  z-index: 7;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

@media (max-width: 1600px) {
  .main-top .main-article .background .img {
    width: 70%;
    left: 30%;
  }
}

@media (max-width: 1600px) {
  .main-top .main-article .background .gradient {
    width: 100% !important;
    left: 0 !important;
  }
}

.main-top .main-article figure {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.main-top .main-article figure figcaption {
  padding: 4.8rem 0;
  position: relative;
  height: 100%;
  z-index: 6;
}

.main-top .main-article figure figcaption .figcaption-content .title {
  max-height: 14rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.h2 {
  font-size: 4rem;
  font-weight: 500;
  font-variation-settings: 'wght' 700;
}

.main-top .main-article figure figcaption .figcaption-content {
  padding: 0 4.8rem;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  width: 41%;
}

@media (max-width: 1048px) {
  .main-top .main-article figure figcaption .figcaption-content {
    width: 100%;
    padding: 0 1.6rem;
  }
}

@media (max-width: 1048px) {
  .main-top .main-article figure {
    z-index: 10;
    -webkit-transform: translateY(calc(3rem - 20vw));
    -ms-transform: translateY(calc(3rem - 20vw));
    -o-transform: translateY(calc(3rem - 20vw));
    transform: translateY(calc(3rem - 20vw));
  }
}

@media (max-width: 1048px) {
  .main-top .main-article .background .gradient {
    width: 100%;
    height: inherit;
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(5%, #0a0d10),
      to(rgba(10, 13, 16, 0))
    );
    background: -webkit-linear-gradient(bottom, #0a0d10 5%, rgba(10, 13, 16, 0));
    background: -o-linear-gradient(bottom, #0a0d10 5%, rgba(10, 13, 16, 0));
    background: linear-gradient(0deg, #0a0d10 5%, rgba(10, 13, 16, 0));
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(5%, var(--background-secondary)),
      to(rgba(var(--background-secondary-number), 0))
    );
    background: -webkit-linear-gradient(
      bottom,
      var(--background-secondary) 5%,
      rgba(var(--background-secondary-number), 0)
    );
    background: -o-linear-gradient(
      bottom,
      var(--background-secondary) 5%,
      rgba(var(--background-secondary-number), 0)
    );
    background: linear-gradient(
      0deg,
      var(--background-secondary) 5%,
      rgba(var(--background-secondary-number), 0)
    );
    left: 0;
  }
}

@media (max-width: 1048px) {
  .main-content-single {
    max-width: inherit;
    margin: inherit;
  }
}

@media (max-width: 1048px) {
  .background {
    position: relative;
  }
}

@media (max-width: 1048px) {
  .main-top {
    min-height: auto;
  }
}

@media (max-width: 1048px) {
  .main-top .main-article figure figcaption {
    padding: 0;
  }
}

@media (max-width: 1048px) {
  .main-top .main-article .background .img {
    position: relative;
    width: 100%;
    height: auto;
    left: 0;
  }
}

@media (min-width: 1048px) {
  .main-content {
    max-width: 160rem;
    margin: 0 auto;
  }
}
@media (min-width: 1048px) {
  .main-content {
    max-width: 160rem;
    margin: 0 auto;
  }
}
</style>
