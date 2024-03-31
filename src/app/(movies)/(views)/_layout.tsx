import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useSearch } from '@/store/useSearch'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const MoviesViews = () => {
  const search = useSearch((state) => state.search)
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: `Filmes: ${search}`,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="search"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}

export default MoviesViews
