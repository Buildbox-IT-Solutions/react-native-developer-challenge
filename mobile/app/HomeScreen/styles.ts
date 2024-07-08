import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';

export const View = styled(SafeAreaView)`
  flex: 1;
  padding: 48px 16px;
  background-color: ${({ theme }) => theme.background};
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const FilterContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  elevation: 6;
  border: 0.5px solid white;
  width: 80%;
  padding: 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
`;

export const SearchIcon = styled(AntDesign)`
  position: absolute;
  right: 12px;
  color: ${({ theme }) => theme.icon};
`;

export const FilterInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding-right: 16px;
`;

export const ThemeView = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.iconBackground};
  border-radius: 8px;
  padding: 6px;
  width: 40px;
  elevation: 6;
`;

export const SunButton = styled(Feather)`
  color: ${({ theme }) => theme.icon};
`;

export const MoonButton = styled(Entypo)`
  color: ${({ theme }) => theme.icon};
`;

export const Card = styled.TouchableOpacity`
  width: 45%;
  border-radius: 24px;
  overflow: hidden;
  elevation: 6;
`;

export const ImageCard = styled.ImageBackground`
  width: 100%;
  height: 300px;
`;

export const CardTitle = styled.Text`
  position: absolute;
  margin: 8px;
  padding: 6px;
  background-color: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardTitle};
  border-radius: 6px;
  width: 70%;
  bottom: 60px;
`;

export const DescriptionCard = styled.Text`
  position: absolute;
  margin: 8px;
  padding: 6px;
  bottom: 8px;
  max-height: 50px;
  overflow: hidden;
  line-height: 20px;
  color: ${({ theme }) => theme.text};
`;
