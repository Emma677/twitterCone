import { View, Text, Button } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/clerk-expo'

const index = () => {
  const {signOut} = useClerk()
  return (
    <View>
      <Text> the index</Text>

      <Button onPress={()=>signOut()} title='signOut' color={'red'}/>
       
    </View>
  )
}

export default index