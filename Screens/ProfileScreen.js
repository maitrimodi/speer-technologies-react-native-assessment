import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import UserProfile from "../components/UserProfile";
import useGithub from "../hooks/useGithub";

export default function ProfileScreen({route}){
    const username = route.params.user;
    const {searchUsers, user} = useGithub();

    useEffect(()=> {
        searchUsers(username);
    }, [])

    useEffect(() => {
        console.log("userProfile", user);
    }, [user])


    return(
        <View style={styles.container}>
           {user?.length!=0  && <UserProfile item={user[0]}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      backgroundColor: '#fff',
      padding: 10
    }
});