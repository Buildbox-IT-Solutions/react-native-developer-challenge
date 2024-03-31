export type MovieDTO = {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export type MoviesListDTO =
  | {
      Response: 'True'
      Search: MovieDTO[]
      totalResults: string
    }
  | { Error: string; Response: 'False' }

export type SingleMovieDTO =
  | {
      Actors: string
      Awards: string
      BoxOffice: string
      Country: string
      DVD: string
      Director: string
      Genre: string
      Language: string
      Metascore: string
      Plot: string
      Poster: string
      Production: string
      Rated: string
      Released: string
      Response: string
      Runtime: string
      Title: string
      Type: string
      Website: string
      Writer: string
      Year: string
      imdbID: string
      imdbRating: string
      imdbVotes: string
    }
  | { Error: string; Response: 'False' }
