import { useClerk } from "@clerk/clerk-expo"
import { Alert } from "react-native";

export const useLogOut = ()=>{
    const {signOut} = useClerk();

    const handleSignOut = () =>{
        Alert.alert("Logout","Are you sure you want to log out",[
            {text: "Cancel", style:'cancel'},
            {
                text:'logout',
                style:'destructive',
                onPress: ()=> signOut()
            }
        ])
    }


    return {handleSignOut}
}