export function getArrayFromLocalStorage<T>(key: string): T[] {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export function saveArrayToLocalStorage(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item))
}
