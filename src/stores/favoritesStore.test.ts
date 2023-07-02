// import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { describe, it, expect, beforeEach } from 'vitest'

describe.concurrent('signUpIsEnabled', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('add favorite', () => {
    const store = useFavoritesStore()
    expect(Object.keys(store.favorites).length).toBe(0)
    store.addToFavorites({ id: 1 } as any)
    expect(Object.keys(store.favorites).length).toBe(1)
  })

  it('check repeated favorite', () => {
    const store = useFavoritesStore()
    expect(() => {
      store.addToFavorites({ id: 3 } as any)
      store.addToFavorites({ id: 3 } as any)
    }).toThrowError('Repeated')
  })

  it('remove favorite', () => {
    const store = useFavoritesStore()
    store.addToFavorites({ id: 1 } as any)
    store.addToFavorites({ id: 2 } as any)
    store.removeFromFavorites({ id: 2 } as any)
    expect(Object.keys(store.favorites).length).toBe(1)
  })

  it('remove favorite raises error', () => {
    const store = useFavoritesStore()
    expect(() => store.removeFromFavorites({ id: 3 } as any)).toThrowError('No match')
  })
})
