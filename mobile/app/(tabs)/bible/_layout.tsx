import { Stack } from 'expo-router'
import React from 'react'

const BibleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Bible Home' }}/>
      <Stack.Screen name='chapter' options={{ title: 'Chapter' }}/>
    </Stack>
  )
}

export default BibleLayout