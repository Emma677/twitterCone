import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LoginButton from '@/components/LoginBtn'
import { useSocialAuth } from '@/hooks/useAuth';

const index = () => {
  const {isLoading,handleSocialAuth} = useSocialAuth()

  return (
    <View className="bg-white flex-1">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              className="size-96"
              resizeMode="contain"
            />
          </View>

          <View className="flex-col gap-2 mt-3">
            <LoginButton
              text="Continue with Google"
              icon={require("../../assets/images/google.png")}
              onPress={()=>handleSocialAuth("oauth_google")}
              isLoading={isLoading}
            />

            <LoginButton
              text="Continue with Apple"
              icon={require("../../assets/images/apple.png")}
              onPress={()=>handleSocialAuth('oauth_apple')}
              isLoading={isLoading}
              imageSize={35}
            />
          </View>
         <View className='mt-4  '>
           <Text className='text-base text-gray-500 text-center'>By signing up you agree with 
            <Text className='text-blue-500'> terms,</Text>
           <Text className='text-blue-500'> Privacy Policy </Text>
           and <Text className='text-blue-500'> Cookie use</Text>
           </Text>
         </View>
        </View>
      </View>
    </View>
  );
}

export default index