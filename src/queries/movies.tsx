import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MovieDTO, MoviesListDTO, SingleMovieDTO } from './dtos/moviesDTOs'

const basePath = 'https://www.omdbapi.com/?apikey=2a791b48'

export function useMoviesList(search: string = 'star wars') {
  const getMovies = async ({ pageParam = 1 }) => {
    const res: MoviesListDTO = await (
      await fetch(`${basePath}&page=${pageParam}&s=${search}&type=movie`)
    ).json()

    if ('Error' in res) {
      throw new Error(
        res.Error === 'Movie not found!'
          ? 'Filme não encontrado. Ajuste sua busca.'
          : 'Erro ao listar filmes, tente novamente.'
      )
    }

    return {
      data: res.Search,
      nextPage: pageParam + 1,
      lastPage: Math.ceil(Number(res.totalResults) / 10),
    }
  }

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', search],
    queryFn: ({ pageParam }: { pageParam: number }) => getMovies({ pageParam }),
    getNextPageParam: (lastPage: { nextPage: number; lastPage: number }) => {
      if (lastPage.nextPage > lastPage.lastPage) return null

      return lastPage.nextPage
    },
  } as any)

  const flattenData: MovieDTO[] | undefined = data?.pages.flatMap(
    (page: any) => page?.data
  )

  return {
    data: flattenData || [],
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}

export function useSingleMovie(id: string) {
  return useQuery({
    queryKey: ['single-movie', id],
    queryFn: async () => {
      const res: SingleMovieDTO = await (
        await fetch(`${basePath}&i=${id}`)
      ).json()

      if ('Error' in res) {
        throw new Error(res.Error)
      }

      return res
    },
  })
}
