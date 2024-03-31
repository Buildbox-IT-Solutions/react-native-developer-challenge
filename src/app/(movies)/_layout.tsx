import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useClientOnlyValue } from '@hooks/useClientOnlyValue'
import { useColorScheme } from '@hooks/useColorScheme'
import { Link, Tabs } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Filmes`,
          href: null,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="search"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 31, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="(views)"
        options={{
          headerShown: false,
          title: 'Filmes',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="file-movie-o" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Informações',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="code" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  )
}

