import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Feedback = ({
  text,
  type = 'success',
}: {
  text: string
  type?: 'success' | 'error'
}) => {
  return (
    <View style={styles.container}>
      <Text style={type === 'success' ? styles.success : styles.error}>
        {text}
      </Text>
    </View>
  )
}

export default Feedback

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.light.tint,
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: 'red',
  },
})
