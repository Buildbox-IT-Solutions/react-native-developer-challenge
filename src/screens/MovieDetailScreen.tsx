import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { movieService } from '../services/movieService';
import { Movie, MovieDetails } from '../types/movie';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: Movie };
};

type MovieDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;
type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

interface Props {
  navigation: MovieDetailScreenNavigationProp;
  route: MovieDetailScreenRouteProp;
}

const MovieDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: movie.Title,
    });

    fetchMovieDetails();
  }, [movie.imdbID, navigation]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const details = await movieService.getMovieDetails(movie.imdbID);
      
      if (details.Response === 'True') {
        setMovieDetails(details);
      } else {
        Alert.alert('Error', 'Failed to load movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      Alert.alert('Error', 'Failed to load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderRating = (rating: { Source: string; Value: string }) => (
    <View key={rating.Source} style={styles.ratingItem}>
      <Text style={styles.ratingSource}>{rating.Source}</Text>
      <Text style={styles.ratingValue}>{rating.Value}</Text>
    </View>
  );

  const renderDetailRow = (label: string, value: string) => {
    if (!value || value === 'N/A') return null;
    
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading movie details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!movieDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load movie details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Movie Poster and Basic Info */}
        <View style={styles.headerSection}>
          <Image
            source={{ 
              uri: movieDetails.Poster !== 'N/A' 
                ? movieDetails.Poster 
                : 'https://via.placeholder.com/300x400?text=No+Image'
            }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.basicInfo}>
            <Text style={styles.title}>{movieDetails.Title}</Text>
            <Text style={styles.subtitle}>{movieDetails.Year} • {movieDetails.Runtime}</Text>
            <Text style={styles.genre}>{movieDetails.Genre}</Text>
            
            {/* IMDb Rating */}
            {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
              <View style={styles.imdbRating}>
                <Text style={styles.imdbLabel}>IMDb</Text>
                <Text style={styles.imdbScore}>{movieDetails.imdbRating}/10</Text>
              </View>
            )}
          </View>
        </View>

        {/* Plot */}
        {movieDetails.Plot && movieDetails.Plot !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plot</Text>
            <Text style={styles.plotText}>{movieDetails.Plot}</Text>
          </View>
        )}

        {/* Cast and Crew */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cast & Crew</Text>
          {renderDetailRow('Director', movieDetails.Director)}
          {renderDetailRow('Writer', movieDetails.Writer)}
          {renderDetailRow('Actors', movieDetails.Actors)}
        </View>

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          {renderDetailRow('Released', movieDetails.Released)}
          {renderDetailRow('Rated', movieDetails.Rated)}
          {renderDetailRow('Language', movieDetails.Language)}
          {renderDetailRow('Country', movieDetails.Country)}
          {renderDetailRow('Awards', movieDetails.Awards)}
          {renderDetailRow('Box Office', movieDetails.BoxOffice)}
        </View>

        {/* Ratings */}
        {movieDetails.Ratings && movieDetails.Ratings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ratings</Text>
            <View style={styles.ratingsContainer}>
              {movieDetails.Ratings.map(renderRating)}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
  },
  headerSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 12,
  },
  imdbRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  imdbLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 4,
  },
  imdbScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  plotText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  ratingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ratingItem: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  ratingSource: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
});

export default MovieDetailScreen;