import { Writable, writable } from 'svelte/store'

const initializeStoreValue = <T>(defaultValue: any) => {
  const { subscribe, set, update } = writable<T>(defaultValue)
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValue)
  }
}

// export const newState = () => {
//   return {
//     count: initializeStoreValue<number>(0)
//   }
// }

export class ClassStore {
  count: Writable<number>;
  constructor () {
    this.count = initializeStoreValue<number>(0)
  }
}

export const classStore = new ClassStore()
