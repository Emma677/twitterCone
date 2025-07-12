import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCreatePost } from '@/hooks/useCreatePost';
import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';

const CreatePost = () => {
    const {
        content,
        setContent,
        selectedImage,
        isCreating,
        pickImageFromGallery,
        takePhoto,
        removeImage,
        sendPost
    } = useCreatePost();

 const {user} =   useUser()

  return (
    <>
    
    
    
    <View className='border-b border-gray-100 bg-white p-4 mt-3'>
        <View className='flex-row'>
             <Image source={{ uri: user?.imageUrl}} className='w-12 h-12 rounded-full mr-3'/>
        <View className='flex-1'>
            <TextInput
                className='text-gray-900 text-lg'
                placeholder="what's happening..."
                placeholderTextColor={"#657786"}
                multiline
                value={content}
                onChangeText={setContent}
                maxLength={200}
            />
        </View>
        </View>


        {
            selectedImage &&(
                <View className='mt-3 ml-15'>
                    <View className='relative'>
                        <Image
                            source={{uri:selectedImage}}
                            className='w-full h-48 rounded-2xl'
                            resizeMode='cover'
                        />
                        <TouchableOpacity
                            className='absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-68 rounded-full
                            items-center justify-center'
                            onPress={removeImage}
                        >
                            <Feather name='x' size={16} color={"white"}/>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }

     
       <View className='flex-1 flex-row justify-between items-center px-3 mt-4'>
           <View className='flex-row gap-2'>
             <Feather onPress={pickImageFromGallery} name='image' size={20} color={"#1DA1F2"}/>
             <Feather onPress={takePhoto} name='camera' size={20} color={"#1DA1F2"}/>
           </View>
           <TouchableOpacity onPress={sendPost} 
                className={`px-4 py-2  rounded-full ${content.trim() || 
                selectedImage? "bg-blue-500": "bg-gray-200"}`}
                disabled= {isCreating || !(content.trim() || selectedImage)}
                >
                <Text className={`font-semibold ${content.trim() || selectedImage ? "text-white": "text-gray-400"}`}>Post</Text>
           </TouchableOpacity>
        </View>

    </View>

    </>
  )
}

export default CreatePost

