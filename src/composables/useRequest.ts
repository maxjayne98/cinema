import { computed, ref } from 'vue'

interface IUpdatePage {
  value?: number
  increaseOne?: boolean
  decreaseOne?: boolean
}

interface Props {
  config?: {
    defaultPage?: number
  }
}

const useRequest = <T, E>({ config: { defaultPage } = { defaultPage: 1 } }: Props = {}) => {
  const data = ref<T | null>(null)
  const error = ref<E | null>(null)
  const loadingState = ref<boolean | 'idle'>('idle')
  const page = ref<number>(Number.isInteger(defaultPage) ? parseInt(defaultPage as any) : 1)

  const setData = (_data: T | null, stopLoading = true, resetError = true): void => {
    data.value = _data
    if (stopLoading) loadingState.value = false
    if (resetError) error.value = null
  }

  const resetData = (): void => {
    setData(null)
  }

  const resetError = (): void => {
    setData(null)
  }

  const getLoading = computed(() => loadingState.value)

  const reset = () => {
    resetData()
    resetError()
    loadingState.value = 'idle'
  }

  const isLoading = computed(() => loadingState.value === true)

  const isIdle = computed(() => loadingState.value === 'idle')

  const updatePage = ({ value = 0, increaseOne = false, decreaseOne = false }: IUpdatePage) => {
    if (increaseOne) {
      page.value += 1
      return
    } else if (decreaseOne) {
      page.value -= 1
      return
    }
    page.value = value
  }

  const getError = computed(() => error.value)

  return {
    setData,
    data,
    getLoading,
    getError,
    error,
    resetError,
    resetData,
    reset,
    isLoading,
    isIdle,
    page,
    updatePage,
    loadingState
  }
}
export default useRequest
