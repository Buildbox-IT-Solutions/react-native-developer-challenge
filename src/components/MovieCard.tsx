import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Movie } from '../types/movie';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with padding

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const handlePress = () => {
    onPress(movie);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image 
        source={{ 
          uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'
        }} 
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.Title}
        </Text>
        <Text style={styles.year}>
          {movie.Year} • {movie.Type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  poster: {
    width: '100%',
    height: cardWidth * 1.5, // 3:2 aspect ratio
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'capitalize',
  },
});

export default MovieCard;