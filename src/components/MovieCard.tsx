import Colors from '@/constants/Colors'
import { MovieDTO } from '@/queries/dtos/moviesDTOs'
import { hasImage } from '@/utils/hasImage'
import { Link } from 'expo-router'
import React, { memo } from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const MovieCard = ({ Poster, Title, Year, imdbID }: MovieDTO) => {
  return (
    <View
      style={[
        styles.container,
        /* container: padding 10 gap 10 => 10 + gap / 2 = 15 ) */
        {
          maxWidth:
            Dimensions.get('window').width &&
            Dimensions.get('window').width < 1000
              ? Dimensions.get('window').width / 2 - 15
              : /* ajuste pra rodar no browser */
                '49%',
        },
      ]}
    >
      <Link href={`/(movies)/(views)/${imdbID}`} asChild>
        <Pressable style={styles.pressable}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: hasImage(Poster),
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {Title}
            </Text>
            <View style={styles.yearContainer}>
              <Text style={styles.year}>{Year}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  )
}

export const MemoizedMovieCard = memo(MovieCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.dark.text,
  },
  pressable: { flex: 1, width: '100%' },
  imageContainer: { width: '100%' },
  image: {
    width: '100%',
    aspectRatio: 11 / 17,
  },
  innerContainer: {
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  yearContainer: {
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10,
  },
  year: {
    color: Colors.dark.text,
    fontSize: 12,
    fontWeight: '800',
  },
})
