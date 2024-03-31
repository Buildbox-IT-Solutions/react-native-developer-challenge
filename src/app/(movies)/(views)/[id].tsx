import Badge from '@/components/Badge'
import Feedback from '@/components/Feedback'
import MovieDetailsText from '@/components/MovieDetailsText'
import Colors from '@/constants/Colors'
import { useSingleMovie } from '@/queries/movies'
import { hasImage } from '@/utils/hasImage'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error } = useSingleMovie(id)

  if (isLoading) {
    return (
      <>
        <Feedback text="Carregando.." />
        <Stack.Screen options={{ title: 'Carregando..' }} />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Feedback text={error.message} type="error" />
        <Stack.Screen options={{ title: 'Erro' }} />
      </>
    )
  }

  if (!data) {
    return (
      <>
        <Feedback text="Filme não encontrado." type="error" />
        <Stack.Screen options={{ title: 'Erro' }} />
      </>
    )
  }

  const genres = data.Genre.trim().split(',')

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Stack.Screen options={{ title: data.Title }} />
        <Image
          source={{ uri: hasImage(data.Poster) }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.badgeContainer}>
          {genres.map((genre) => (
            <Badge text={genre} key={genre} />
          ))}
        </View>

        <MovieDetailsText text={data.Title} label="Titulo" />
        <MovieDetailsText text={data.Director} label="Diretor" />
        <MovieDetailsText text={data.Writer} label="Escritores" />
        <MovieDetailsText text={data.Runtime} label="Duração" />
        <MovieDetailsText text={data.Actors} label="Atores Principais" />
        <MovieDetailsText text={data.Released} label="Data de Lançamento" />
        <MovieDetailsText text={data.BoxOffice} label="Faturamento" />
        <MovieDetailsText text={data.Awards} label="Premiações" />
        <MovieDetailsText text={data.Plot} label="Sinopse" />
      </View>
    </ScrollView>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.light.tint,
  },
  image: {
    width: '50%',
    aspectRatio: 11 / 17,
    alignSelf: 'center',
    marginBottom: 15,
  },
})
