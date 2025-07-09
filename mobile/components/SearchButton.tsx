import { View, Text, TextInput, FlatList } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'


const SearchButton = () => {
  return (
  <View>
     <View className='flex flex-row w-[95%] px-2 bg-gray-200  mx-auto items-center mt-4  rounded-full'>
    <Feather name='search' size={24} color={"#9ca3af"}/>
     <TextInput placeholder='Search Twitter' 
     className=' flex items-center w-full text-md'  placeholderTextColor={"#9ca3af"}/>
   </View>
  </View>
  )
}

export default SearchButton