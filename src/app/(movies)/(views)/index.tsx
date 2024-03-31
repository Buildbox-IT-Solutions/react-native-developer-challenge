import Feedback from '@/components/Feedback'
import { MemoizedMovieCard } from '@/components/MovieCard'
import Colors from '@/constants/Colors'
import { useMoviesList } from '@/queries/movies'
import { useSearch } from '@/store/useSearch'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function MoviesScreen() {
  const search = useSearch((state) => state.search)
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMoviesList(search)

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading) {
    return <Feedback text="Carregando.." />
  }

  if (error) {
    return <Feedback text={error.message} type="error" />
  }

  if (!Array.isArray(data)) {
    return <Feedback text="Nenhum filme encontrado." type="error" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.imdbID}
        data={data}
        renderItem={({ item }) => <MemoizedMovieCard {...item} />}
        onEndReached={loadNext}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={styles.loading}>Carregando..</Text>
          ) : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.light.tint,
  },
})

