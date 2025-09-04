import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie';

type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: Movie };
};

type MovieListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieList'>;
type MovieListScreenRouteProp = RouteProp<RootStackParamList, 'MovieList'>;

interface Props {
  navigation: MovieListScreenNavigationProp;
  route: MovieListScreenRouteProp;
}

const MovieListScreen: React.FC<Props> = ({ navigation }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('batman'); // Default search
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchMovies = async (query: string, pageNum: number = 1, isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await movieService.searchMovies(query, pageNum);
      if (response.Response === 'True' && response.Search) {
        if (pageNum === 1) {
          setMovies(response.Search);
        } else {
          setMovies(prev => [...prev, ...response.Search]);
        }
        
        const totalResults = parseInt(response.totalResults);
        const currentCount = pageNum * 10; // API returns 10 results per page
        setHasMore(currentCount < totalResults);
        setPage(pageNum);
      } else {
        if (pageNum === 1) {
          setMovies([]);
        }
        Alert.alert('No Results', 'No movies found for your search.');
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      searchMovies(searchQuery, page + 1);
    }
  };

  const handleRefresh = () => {
    searchMovies(searchQuery, 1, true);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPage(1);
      setHasMore(true);
      searchMovies(searchQuery.trim(), 1);
    }
  };

  useEffect(() => {
    searchMovies(searchQuery);
  }, []);

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={handleMoviePress} />
  );

  const renderFooter = () => {
    if (!loading || refreshing) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Movies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      
      {loading && movies.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={item => item.imdbID}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
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
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default MovieListScreen;