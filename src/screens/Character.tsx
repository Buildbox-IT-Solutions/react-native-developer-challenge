import { useContext, useEffect, useState } from 'react';

import { Episode } from '@api/character/model';
import { ThemeContext } from '@contexts/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from 'App';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// eslint-disable-next-line import/no-named-as-default
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamsList, 'Character'>;

function Character({ route }: Props) {
  const data = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function initComponent() {
      try {
        setLoading(true);

        const promises = data.episode.map(async item => {
          const response = await fetch(item);
          return await response.json();
        });

        const response = await Promise.all<Episode>(promises);
        setEpisodes(response.sort((a, b) => (a.id < b.id ? -1 : 1)));

        setLoading(false);
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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ImageBackground style={styles.background} source={{ uri: data.image }}>
          <LinearGradient
            style={styles.gradient}
            colors={['transparent', theme.backgroundColor]}>
            <View style={styles.header}>
              <Image
                width={60}
                height={60}
                source={{ uri: data.location.url }}
              />
              <View style={styles.chip_container}>
                <View style={styles.chip}>
                  <Text style={styles.status}>{data.species}</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.status}>{data.status}</Text>
                </View>
              </View>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={{ ...styles.origin, color: theme.color }}>
                Origem: {data.origin.name}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.body}>
          <Text style={styles.title}>Participação:</Text>
          {loading && <ActivityIndicator size="large" color={theme.color} />}
          {episodes.map((item, index) => (
            <View key={index} style={styles.episode}>
              <View style={{ ...styles.episode_content, flex: 1 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  style={styles.episode_name}>
                  {item.name}
                </Text>
                <Text style={styles.air_date}>{item.air_date}</Text>
              </View>
              <View style={styles.episode_content}>
                <Text style={styles.episode_text}>Episódio</Text>
                <Text>{item.episode}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
  },
  gradient: {
    top: 0,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  header: {
    gap: 8,
    padding: 16,
    width: '100%',
  },
  chip_container: {
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#3f817b',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  origin: {
    fontSize: 16,
    fontWeight: '300',
  },
  body: {
    gap: 16,
    padding: 16,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
  },
  episode: {
    gap: 16,
    padding: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    borderColor: '#3f817b',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episode_content: {
    gap: 2,
  },
  episode_name: {
    fontSize: 16,
  },
  air_date: {
    opacity: 0.5,
    fontSize: 12,
  },
  episode_text: {
    fontSize: 12,
  },
});

export default Character;
