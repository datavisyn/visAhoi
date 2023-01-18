import { writable } from 'svelte/store'
import { VisahoiState } from './state'
export const stores = writable<Map<string, VisahoiState>>(new Map())
export const initializeStoreValue = <T>(defaultValue: any) => {
  const { subscribe, set, update } = writable<T>(defaultValue)
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValue)
  }
}