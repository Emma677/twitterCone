import { View, Text, Button } from 'react-native'
import React from 'react'
import {  useClerk } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'


export default function index() {
  return (
   <SafeAreaView className='flex-1'>
    <Text>Home</Text>

    <SignOutButton/>
   </SafeAreaView>
  )
}