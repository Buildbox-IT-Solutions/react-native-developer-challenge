import { create } from 'zustand'
interface UseSearch {
  search: string
  setSearch: (str: string) => void
}

export const useSearch = create<UseSearch>((set) => ({
  search: 'star wars',
  setSearch: (search: string) => set({ search }),
}))
