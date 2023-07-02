import { ref, onMounted, onUnmounted, type Ref } from 'vue'
export default function useIndefiniteScroll(
  callback: () => void,
  el: Ref,
  options?: IntersectionObserverInit
) {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        callback()
      }
    }, options)

    el.value && observer.value.observe(el.value)
  })
  onUnmounted(() => {
    observer.value && observer.value.disconnect()
  })
}
