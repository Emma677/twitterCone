import { useState } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"
import { useApiClient } from "@/utils/api";

export const useCreatePost = ()=>{
    const [content,setContent] = useState("");
    const [selectedImage,setSelectedImage] = useState<string | null>(null)
    const api = useApiClient();
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: async(postData: {content: string; imageUrl?: string}) =>{
            const formData = new FormData()

            if(postData.content) formData.append("content",postData.content);

            if(postData.imageUrl){
                const urlParts = postData.imageUrl.split(".");
                const fileType = urlParts[urlParts.length -1].toLowerCase();

                const mimeTypeMap: Record <string, string> ={
                    png: "image/png",
                    gif: "image/gif",
                    webp: "image/webp"
                }
                const mimeType = mimeTypeMap[fileType] || 'image/jpeg'

                formData.append("image",{
                    uri:postData.imageUrl,
                    name: `image.${fileType}`,
                    type: mimeType
                } as any)
            }
            return api.post("/posts",formData, {
                headers:{"Content-Type": "multipart/form-data"}
            })
        },
        onSuccess : () =>{
            setContent("");
            setSelectedImage(null);
            queryClient.invalidateQueries({queryKey :["posts"]});
            Alert.alert("success","post created successfully")
        },
        onError: ()=>{
            Alert.alert("Error","Failedd to create post")
        }
    })

    const handleImagePicker = async(useCamera: boolean =false)=>{
        const permissionResult = useCamera ? 
        await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()


        if(permissionResult.status !== "granted"){
            const source = useCamera ? "camera" : "photo library";
            Alert.alert(`Permission needed", "Please grant permission to access your ${source}`);
            return;
        }

        const pickerOption ={
            allowsediting: true,
            aspect: [16, 9] as [number, number],
            quality:0.8
        };

        const result = useCamera
            ? await ImagePicker.launchCameraAsync(pickerOption)
            : await ImagePicker.launchImageLibraryAsync({
                ...pickerOption,
                mediaTypes: ["images"],
            })
            if(!result.canceled) setSelectedImage(result.assets[0].uri)
    }

const sendPost = ()=>{
    if(!content.trim() && !selectedImage){
        Alert.alert("empty post","try adding a text or an image")
        return;
    }

const postData: {content: string; imageUri?: string} ={
    content: content.trim(),
};

if(selectedImage) postData.imageUri = selectedImage;
createPostMutation.mutate(postData)

}

return {content,
        setContent,
        selectedImage,
        isCreating: createPostMutation.isPending,
        pickImageFromGallery: ()=>handleImagePicker(false),
        takePhoto: ()=> handleImagePicker(true),
        removeImage:()=> setSelectedImage(null),
        sendPost
    }

}