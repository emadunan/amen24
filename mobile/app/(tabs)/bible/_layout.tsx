import { Stack } from 'expo-router'
import React from 'react'

const BibleLayout = () => {
  return (
    <Stack screenOptions={{
      headerTitleAlign: "center",
    }}>
      <Stack.Screen name='index' options={{ title: '' }} />
      <Stack.Screen name='[key]' />
    </Stack>
  )
}

export default BibleLayout