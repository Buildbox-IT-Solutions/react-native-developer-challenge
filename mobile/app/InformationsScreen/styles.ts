import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const View = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 324px;
`;

export const BackButton = styled(AntDesign)`
  position: absolute;
  top: 32px;
  left: 24px;
  color: white;
`;

export const InformationsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 24px;
`;

export const ImageTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled.View``;

export const ImageSquare = styled.Image`
  width: 74px;
  height: 74px;
  border-radius: 12px;
`;

export const GenresContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Genre = styled.Text`
  font-size: 12px;
  width: 80px;
  margin-left: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 6px;
  background-color: ${({ theme }) => theme.backgroundClassification};
  color: ${({ theme }) => theme.classificationText};
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-left: 12px;
  color: ${({ theme }) => theme.text};
  width: 70%;
`;

export const Description = styled.Text`
  margin-top: 16px;
  font-size: 18px;
  padding: 16px;
  color: ${({ theme }) => theme.text};
`;
