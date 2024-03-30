import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { getMovieDetails } from '../../service/api'
import { ScrollView } from 'react-native-gesture-handler'
import { Paragraph } from 'react-native-paper'

interface Genre {
  id: number;
  name: string;
}


function Details( { route } : any) {
    const { movieId, mediaType } = route.params

    const detailsQuery = useQuery({
      queryKey: ["details", movieId, mediaType ],
      queryFn: () => getMovieDetails(movieId, mediaType)
    })

    const movie = detailsQuery.data

    const getYear = (date: string) => {
      const year = new Date(date).getFullYear()
      return year
    }

    const getGenres = (movies: Genre[]) => {
      let generos : string[] = [];

      movies?.forEach((item) => {
        if(!generos.includes(item.name)){
          generos.push(item.name)
        }
      })

      const arrayFormatado = generos.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
    
      const resultado = arrayFormatado.join(', ');
  
      return resultado;
    }
    

    const movieYear = getYear(movie?.release_date)
    const genres = getGenres(movie?.genres)

  return (
    <ScrollView >
      <View style={styles.container}>
        {/* <Text style={styles.text}>Detalhes do filme</Text> */}
        <View style={styles.backDropContainer}>
          <ImageBackground style={{ width: '100%', height: '100%' }} resizeMode="stretch" source={{
            uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` 
          }}></ImageBackground>
          <View style={styles.posterImageContainer}>
            <ImageBackground style={{ width: '100%', height: '100%' }} resizeMode="stretch" source={{
              uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` 
            }}></ImageBackground>
          </View>
        </View>
        <View style={styles.mainContentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.Title}>{movie?.title || movie?.name}</Text>
              <Text style={styles.dateText}>({movieYear})</Text>
            </View>
            <Paragraph style={{fontSize: 16}}>{movie?.tagline}</Paragraph>
            <Text style={{fontSize: 20}} >{movie?.overview}</Text>
            <View style={styles.infoContainer}>
              <Text style={{fontSize: 20}}>Gêneros: <Text style={{ textDecorationLine: "underline"}}>{genres}</Text></Text>
              <Text style={{fontSize: 20}}>Nota: <Text style={{ textDecorationLine: "underline"}}>{movie?.vote_average.toFixed(2)}</Text></Text>
              <Text style={{fontSize: 20}}>Status: <Text style={{ textDecorationLine: "underline"}}>{movie?.status}</Text></Text>
              <Text style={{fontSize: 20}}>Popularidade: <Text style={{ textDecorationLine: "underline"}}>{movie?.popularity}</Text></Text>
            </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  Title: {
    fontSize: 50,
    fontWeight: "bold"
  },
  dateText: {
    fontSize: 20,
    fontWeight: "400"
  },
  mainContentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    gap: 10
  },
  titleContainer: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "row",
    width: "100%"
  },
  backDropContainer: {
    height: 400,
    width: "100%"
  },
  posterImageContainer: {
    height: 380,
    width: "50%",
    zIndex: 100,
    position: "absolute",
    top: 10,
    left: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
  }

});

export default Details