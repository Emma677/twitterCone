import { View, Text, Button, ScrollView } from 'react-native'
import React from 'react'
import {  useClerk } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
// import { Feather } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';
import CreatePost from '@/components/CreatePost'


export default function index() {
  useUserSync()
  return (
   <SafeAreaView className='flex-1 bg-white'>
     <View className='flex-row justify-between px-3'>
       <Ionicons name='logo-twitter' color={"#1DA1F2"} size={24}/>
      <Text>Home</Text>
      <SignOutButton/>
     </View>

     <ScrollView 
      className='flex-1'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
     >
      <CreatePost/>
     </ScrollView>
   </SafeAreaView>
  )
}