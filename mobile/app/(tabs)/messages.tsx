import { View, Text, Alert, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchButton'
import { Feather } from '@expo/vector-icons'
import { CONVERSATIONS, ConversationType } from '@/data/conversation'

const MessageScreen = () => {
  const insets = useSafeAreaInsets()
  const[message,setMessage]= useState("")
  const[conversationList,setConversationList]= useState(CONVERSATIONS)
  const[selectedConversation,setSelectedConversation]= useState<ConversationType | null>(null)
  const[isChatOpen,setIsChatOpen]= useState(false)
  const[newMessage,setNewMessage]= useState("") 

  const deleteConversation =(conversationId: number) =>{
    Alert.alert("delete conversation","Are you sure",[
      {text: "Cancel", style:"cancel"},
      {text: "Delete", style: "destructive" ,
        onPress : ()=>{
          setConversationList((prev)=>prev.filter((convo)=>convo.id !== conversationId))
        }}
    ])
  }

  const openConvo = (conversation:ConversationType)=>{
    setSelectedConversation(conversation);
    setIsChatOpen(true)
  }

  const closeChatModal = ()=>{
    setIsChatOpen(false)
    setSelectedConversation(null)
    setNewMessage("")
  }

  const sendMessage =()=>{
    if(newMessage.trim() && selectedConversation){
      setConversationList((prev)=>
      prev.map((convo)=>
        convo.id === selectedConversation.id ? {...convo, lastMessage: newMessage, time:"now"} : convo
      ))
      setNewMessage("");
      Alert.alert(
        "Message sent",
        `Your message has been sent to ${selectedConversation.user.name}`
      )
    }
  }

  return (
    <SafeAreaView className="flex-1 mt-2" edges={["top"]}>
      <View className="flex-row justify-between px-4">
        <Text className="font-bold text-black text-xl">Messages</Text>
        <Feather name="edit" size={24} color={"#60a5fa"} />
      </View>
      <SearchBar
        value={message}
        onChangeText={setMessage}
        placeholder="Search for people and group"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationList.map((message) => (
          <TouchableOpacity
            key={message.id}
            className="flex-row items-center p-4 border-b border-gray-50
              active:bg-gray-50
            "
            onPress={() => openConvo(message)}
            onLongPress={() => deleteConversation(message.id)}
          >
            <Image
              source={{ uri: message.user.avatar }}
              className="rounded-full w-12 h-12"
            />

            <View className="flex-col py-1 flex-1">
              <View className="flex-row flex justify-between px-2">
                 <Text className=''>
                  {message.user.name} {""}
                  {message.user.verified && <Feather name='check-circle'color={"#60a5fa"}/>}
                  <Text className='ml-2 text-gray-400'>  @{message.user.username}</Text>
                </Text>

                
                  <Text>{message.time}</Text>
            
              </View>
              <Text numberOfLines={1} className='text-gray-400 pl-2'>{message.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className='px-4 py-2 border-t border-gray-100 bg-gray-50'>
        <Text className='text-xs text-gray-500 text-center'>Tap to open · Long press to delete</Text>
      </View>

      <Modal visible={isChatOpen} animationType="slide" 
          presentationStyle="pageSheet">
            {
              selectedConversation && (
                <SafeAreaView className='flex-1'>
                  <View className='flex-row items-center px-4 border-b border-gray-100 my-3 gap-3'>
                     <TouchableOpacity onPress={closeChatModal} className='mr-3'>
                       <Feather name='arrow-left' size={24}/>
                     </TouchableOpacity>
                    <Image className='size-10 rounded-full' source={{uri: selectedConversation.user.avatar}}/>

                    <View className='flex-1'>
                      <Text className='font-bold text-xl'>{selectedConversation.user.name}
                        <Text> {selectedConversation.user.verified && <Feather name='check-circle' size={15}/>}</Text>
                      </Text>
                       
                      <Text className='text-gray-400'>@{selectedConversation.user.username}</Text>
                    </View>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    {selectedConversation.messages.map((chat)=>(
                      <View
                        key={chat.id}
                        className={`flex-row mb-3 ${chat.fromUser} ? "justify-end" : ""`}
                      >
                        {!chat.fromUser &&(
                          <Image
                            source={{uri: selectedConversation.user.avatar}}
                            className='size-8 rounded-full mr-2'
                          />
                        )}
                        <View className={`flex-1 ${chat.fromUser ? "items-end": ""}`}>
                          <View className={`rounded-2xl px-4 py-3 max-w-xs ${
                            chat.fromUser ? "bg-blue-500" : "bg-gray-100"
                          }`}>
                            <Text className={chat.fromUser ? "text-white" : "text-gray-900"}>
                              {chat.text}
                            </Text>
                          </View>
                          <Text className='text-xs text-gray-400 mt-1'>{chat.time}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  <View className='flex-row items-center px-4 py-3 border-t border-gray-100'>
                    <View className='flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-3 mr-3 '>
                      <TextInput
                        className='flex-1 text-base'
                        placeholder='start a message...'
                        placeholderTextColor={"#657786"}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        multiline
                      />
                    </View>
                    <TouchableOpacity
                      onPress={sendMessage}
                      className={`size-10 rounded-full items-center justify-center ${
                        newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                      }`}
                      disabled={!newMessage.trim()}
                    >
                      <Feather name='send' size={20} color={"white"}/>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              )
            }
      </Modal>
    </SafeAreaView>
  );
}

export default MessageScreen