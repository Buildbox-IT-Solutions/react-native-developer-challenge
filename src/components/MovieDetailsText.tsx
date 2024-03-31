import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

const MovieDetailsText = ({ label, text }: { label: string; text: string }) => {
  return (
    <Text style={styles.text}>
      <Text style={styles.innerText}>{label} : </Text>
      {text}
    </Text>
  )
}

export default MovieDetailsText

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'left',
  },
  innerText: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: '600',
  },
})
