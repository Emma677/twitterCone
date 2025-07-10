// import { View, Text, TextInput, FlatList } from 'react-native'
// import React from 'react'
// import { Feather } from '@expo/vector-icons'


// const SearchButton = () => {
//   return (
//   <View>
//      <View className='flex flex-row w-[95%] px-2 bg-gray-200  mx-auto items-center mt-4  rounded-full'>
//     <Feather name='search' size={24} color={"#9ca3af"}/>
//      <TextInput placeholder='Search Twitter' 
//      className=' flex items-center w-full text-md'  placeholderTextColor={"#9ca3af"}/>
//    </View>
//   </View>
//   )
// }

// export default SearchButton

import React from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';



type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search Twitter", value, onChangeText }) => {
  return (
    <View className="w-[95%] mx-auto mt-4">
      <View className="flex-row items-center bg-gray-200 rounded-full px-3 py-2 shadow-sm">
        <Feather name="search" size={20} color="#9ca3af" />
        <TextInput
          className="ml-2 flex-1 text-gray-800 text-md"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default SearchBar;
