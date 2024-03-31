import Colors from '@/constants/Colors'
import { StyleSheet, Text, View } from 'react-native'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.subtitle}>
        Desenvolvido com React-Native e Expo (Expo Router).
      </Text>
      <Text style={styles.paragraph}>
        Utilizei a lib{' '}
        <Text style={styles.highlight}>@tanstack/react-query</Text> para cachear
        requisições e criar o efeito de infinity scroll com uma melhor
        performance em conjunto com o FlatList e React.memo. Como a api sugerida
        exige um termo de busca para funcionar, optei por usar o{' '}
        <Text style={styles.highlight}>Zustand</Text> pra compartilhar esse dado
        entre as telas.
      </Text>
      <Text style={styles.paragraph}>
        Também optei por deixar a api key no código para facilitar o teste, já
        que o 'vazamento' dessa key não envolve nenhuma perda real.
      </Text>
      <Text style={styles.paragraph}>
        Estou estudando react-native a relativamente pouco tempo, tendo maior
        conhecimento com desenvolvimento web, com{' '}
        <Text style={styles.highlight}>React e Next.js</Text>, mas como fiz um
        teste com vocês no inicio de 2022 e ele permanece o mesmo, preferi fazer
        este em react-native.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  subtitle: { fontSize: 14, fontWeight: '500' },
  paragraph: {
    fontSize: 16,
    marginVertical: 5,
  },
  highlight: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})

