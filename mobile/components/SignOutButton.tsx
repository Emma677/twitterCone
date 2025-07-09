import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useLogOut } from '@/hooks/useLogOut'

const SignOutButton = () => {
  const {handleSignOut} = useLogOut()
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name='log-out' size={24} color={"#E0245E"}/>
    </TouchableOpacity>
  )
}

export default SignOutButton