import React, { useContext, useEffect, useState } from 'react';

import { listCharacters } from '@api/character';
import { Character } from '@api/character/model';
import { ThemeContext } from '@contexts/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from 'App';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamsList, 'Home'>;

const { width } = Dimensions.get('window');
const GAP = 16,
  ITEM_WIDTH = (width - GAP * 3) / 2;

function Home({ navigation }: Props) {
  const [data, setData] = useState<Character[]>([]);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function initComponent() {
      try {
        const response = await listCharacters();

        setData(response.results);
      } catch (err) {
        console.error(err);
      }
    }

    initComponent();
  }, []);

  return (
    <SafeAreaView
      style={{ ...styles.wrapper, backgroundColor: theme.backgroundColor }}>
      <StatusBar
        barStyle={theme.barStyle}
        backgroundColor={theme.backgroundColor}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="automatic">
        {data.map((item, index) => (
          <ImageBackground
            key={index}
            style={{
              ...styles.background,
              shadowColor: theme.color,
            }}
            source={{ uri: item.image }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Character', item)}>
              <View style={styles.card}>
                <View style={styles.chip}>
                  <Text style={styles.specie}>
                    {item.species.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: GAP,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  background: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: GAP / 2,
    elevation: 3,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
  },
  button: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
  },
  card: {
    gap: 4,
    padding: 12,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#26242280',
  },
  chip: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#3f817b',
  },
  specie: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default Home;
