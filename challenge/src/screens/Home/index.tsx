import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View, StyleSheet } from 'react-native'
import { styled } from 'nativewind'
import InputArea from '../../components/InputArea'
import { useQuery } from '@tanstack/react-query'
import { getSearchResults, getTrending } from '../../service/api'
import MovieCard from '../../components/MovieCard'
import useDebounce from '../../utils/useDebounce'

const ViewStyled = styled(View)
const TextStyled = styled(Text)

function Home() {
  const [searchString, setSearchString] = useState<string>("")
  const debouncedString = useDebounce(searchString, 300)

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending
  })

  const searchQuery = useQuery({
    queryKey: ['searchedItems', debouncedString],
    queryFn: () =>  getSearchResults(debouncedString),
    enabled: debouncedString.length > 0
  })


  return (
    <ViewStyled className='h-full w-full flex items-center flex-col'>
        <InputArea setQueryString={setSearchString}></InputArea>

        <ViewStyled className='flex justify-start w-full pl-12 mt-4'>
          <TextStyled className='text-3xl font-medium'>{searchQuery.data?.results ? "Resultados" : "Trending"}</TextStyled>
        </ViewStyled>

        {trendingQuery.isLoading || searchQuery.isLoading && 
          <ActivityIndicator size="large" color={"red"} />
        }

        <ScrollView showsVerticalScrollIndicator={false}> 
          {
            searchQuery.data?.results ? (
              <>{searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item}></MovieCard>)}</>
            )
            : (
              <>
                {
                    trendingQuery.data?.results.map((item, key) => {
                    return (
                      <MovieCard key={item.id} movie={item}></MovieCard>
                      )
                    })
                  }
              </>
            )
          }
        </ScrollView>
    </ViewStyled >
  )
}

export default Home