import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { forwardRef } from 'react'

type ButtonProps = {
  title: string
} & React.ComponentPropsWithoutRef<typeof Pressable>

const Button = forwardRef<View | null, ButtonProps>(
  ({ title, disabled, ...pressableProps }, ref) => {
    return (
      <View style={[styles.container, disabled && { opacity: 0.5 }]}>
        <Pressable
          ref={ref}
          style={({ pressed }) =>
            pressed ? [styles.pressable, styles.pressed] : styles.pressable
          }
          android_ripple={{ color: '#2c736d' }}
          disabled={disabled}
          {...pressableProps}
        >
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    marginVertical: 10,
    overflow: 'hidden',
  },
  pressable: {
    alignItems: 'center',
    padding: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
})

export default Button
