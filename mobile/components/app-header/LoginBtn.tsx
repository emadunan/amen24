import React from 'react'
import { Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

const LoginBtn = () => {
  return (
    <Pressable onPress={() => {}}>
      <AntDesign name="login" size={24} color="black" />
    </Pressable>
  )
}

export default LoginBtn