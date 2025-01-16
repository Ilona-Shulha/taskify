import { ref } from 'vue'

export function useDebounce<T>(
  callback: (...args: T[]) => void,
  delay = 300,
): (...args: T[]) => void {
  const debouncedRef = ref<number | undefined>(undefined)

  const debouncedCallback = (...args: T[]) => {
    clearTimeout(debouncedRef.value)
    debouncedRef.value = setTimeout(() => callback(...args), delay)
  }

  return debouncedCallback
}
