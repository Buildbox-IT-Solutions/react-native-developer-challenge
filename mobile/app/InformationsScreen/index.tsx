import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Colors } from '@/constants/Colors';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../navigation';
import GradientOverlay from '@/components/GradientOverlay';
import { Allgenres } from '@/utils/genres';

import * as S from './styles';

const lightTheme = Colors.light;
const darkTheme = Colors.dark;

type InformationsScreenRouteProp = RouteProp<
  RootStackParamList,
  'InformationsScreen'
>;

type Props = {
  route: InformationsScreenRouteProp;
};

type GenreProps = {
  name: string;
  id: number;
};

export default function InformationsScreen({ route }: Props) {
  const { movie, isDarkTheme } = route.params;
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const imagePath = 'https://image.tmdb.org/t/p/w500';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const mapGenreIdsToGenres = () => {
      const mappedGenres = movie.genre_ids.map((genreId: number) => {
        const foundGenre = Allgenres.find(genre => genre.id === genreId);
        return foundGenre ? foundGenre : { id: genreId, name: 'Unknown' };
      });
      setGenres(mappedGenres);
    };
    mapGenreIdsToGenres();
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <S.View>
        <S.ImageBackground
          source={
            movie.backdrop_path
              ? { uri: `${imagePath}${movie.backdrop_path}` }
              : undefined
          }
        >
          <GradientOverlay />
          <S.BackButton
            name="arrowleft"
            size={24}
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </S.ImageBackground>
        <S.InformationsContainer>
          <S.ImageTitleContainer>
            <S.ImageSquare
              source={
                movie.poster_path
                  ? { uri: `${imagePath}${movie.poster_path}` }
                  : undefined
              }
            />
            <S.TextContainer>
              <S.GenresContainer>
                {genres.map(genre => (
                  <S.Genre key={genre.id}>{genre.name}</S.Genre>
                ))}
              </S.GenresContainer>
              <S.Title>{movie.title}</S.Title>
            </S.TextContainer>
          </S.ImageTitleContainer>
          <S.Description>{movie.overview}</S.Description>
        </S.InformationsContainer>
      </S.View>
    </ThemeProvider>
  );
}
