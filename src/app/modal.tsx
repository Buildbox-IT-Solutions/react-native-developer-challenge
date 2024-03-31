import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { useSearch } from '@/store/useSearch'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ModalScreen() {
  const router = useRouter()
  const { search, setSearch } = useSearch((state) => state)
  const [innerSearch, setInnerSearch] = useState('')

  const updateSearch = () => {
    setSearch(innerSearch)
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Busque seu filme favorito</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setInnerSearch}
            value={innerSearch}
          />
        </View>

        <Text style={styles.description}>
          Ex: Iron Man, Pirates of the Caribbean
        </Text>
        <Button title="Buscar" onPress={updateSearch} disabled={!innerSearch} />
        <Text>busca atual: {search}</Text>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F817B60',
  },
  innerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    gap: 10,
    minWidth: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderColor: Colors.light.tint,
    borderWidth: 2,
    color: Colors.light.text,
    textAlign: 'center',
  },
  description: {
    marginTop: -10,
  },
})

