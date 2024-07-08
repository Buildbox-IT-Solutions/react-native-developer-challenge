import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Colors } from '@/constants/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import GradientOverlay from '@/components/GradientOverlay';
import { CustomTextInput } from '@/components/TextInput';
import api from '@/utils/api';

import * as S from './styles';

const lightTheme = Colors.light;
const darkTheme = Colors.dark;

type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function HomeScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);
  const [filterText, setFilterText] = useState('');
  const imagePath = 'https://image.tmdb.org/t/p/w500';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('');
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(filterText.toLowerCase()),
    );
    setFilteredMovies(filtered);
  }, [filterText, movies]);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <S.View>
        <S.HeaderContainer>
          <S.FilterContainer>
            <CustomTextInput
              placeholder="Filtrar..."
              onChangeText={setFilterText}
            />
            <S.SearchIcon name="search1" size={18} />
          </S.FilterContainer>
          <S.Container>
            <S.ThemeView>
              <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
                {isDarkTheme ? (
                  <S.SunButton name="sun" size={18} />
                ) : (
                  <S.MoonButton name="moon" size={18} />
                )}
              </TouchableOpacity>
            </S.ThemeView>
          </S.Container>
        </S.HeaderContainer>
        <FlatList
          data={filteredMovies}
          renderItem={({ item }) => (
            <S.Card
              onPress={() =>
                navigation.navigate('InformationsScreen', {
                  movie: item,
                  isDarkTheme,
                })
              }
            >
              <S.ImageCard
                source={
                  item.poster_path
                    ? { uri: `${imagePath}${item.poster_path}` }
                    : undefined
                }
              >
                <GradientOverlay />
                <S.CardTitle>{item.title}</S.CardTitle>
                <S.DescriptionCard>{item.overview}</S.DescriptionCard>
              </S.ImageCard>
            </S.Card>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 12, gap: 26 }}
          columnWrapperStyle={{ gap: 26 }}
        />
      </S.View>
    </ThemeProvider>
  );
}
