import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchButton from '@/components/SearchButton'


const TrendingTopics = [
    {topic: "React Native", tweets: "125k"},
    {topic: "Typescript", tweets: "125k"},
    {topic: "Web Development", tweets: "125k"},
    {topic: "AI", tweets: "125k"},
    {topic: "AI", tweets: "125k"},
]

const SearchScreen = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <SearchButton/>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='p-4'>
          <Text className='font-bold text-xl'>Trending for you</Text>
        {
            TrendingTopics.map((item,index)=>(
              <TouchableOpacity className='py-2' key={index}>
                <Text className='text-sm text-gray-500'>Treding in Tech</Text>
                <Text className='font-bold text-xl'>{item.topic}</Text>
                <Text className='text-sm text-gray-500'>{item.tweets} tweets</Text>
              </TouchableOpacity>
            ))
        }
       </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen