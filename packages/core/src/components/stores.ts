import { writable } from 'svelte/store'
import { VisahoiState } from './state'
export const stores = writable<Map<string, VisahoiState>>(new Map())
