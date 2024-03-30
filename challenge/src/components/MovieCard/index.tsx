import { Link, LinkingContext, useNavigation } from '@react-navigation/native'
import { styled } from 'nativewind'
import React from 'react'
import { MediaType, ResultItem } from '../../interfaces/apiResult'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleProp, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface MovieProps {
  movie: ResultItem;
}


function MovieCard( { movie } : MovieProps) {

  const ViewStyled = styled(View)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const handleNavigateToDetails = () => {
    navigation.navigate("Details", { movieId: movie.id, mediaType: movie.media_type });
  };


  return (
    <ViewStyled className='p-3 w-96'>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{movie.name || movie.title}</Text>
          <Text variant="bodyMedium">{movie.overview}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} resizeMode="contain" style={{ width: '100%', resizeMode: "contain"}}/>
        <Card.Actions>
          <Button onPress={handleNavigateToDetails}>Mais informações</Button>
        </Card.Actions>
    </Card>
   </ViewStyled> 
  )
}

export default MovieCard