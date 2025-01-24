import React from 'react'
import { Pressable } from 'react-native'
import { IconSymbol } from '../ui/IconSymbol'

const LoginBtn = () => {
  return (
    <Pressable onPress={() => {}}>
      <IconSymbol size={28} name="login" color={"#fff"} />
    </Pressable>
  )
}

export default LoginBtn