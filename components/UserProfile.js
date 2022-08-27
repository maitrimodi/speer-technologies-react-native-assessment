import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { variables } from "../Utils/constants";

export default function UserProfile({item}){
    const navigation = useNavigation();

    return (
    <View style={styles.item}>
        <TouchableOpacity onPress={()=>{
        Linking.openURL(item.html_url)
        }}>
            <View style={styles.avatar}>
                <Image  style={{height:200, width:200}} source={{ uri: `${item.avatar_url}`}}/>
            </View>
        <Text style={[styles.username, styles.bold]}> Username : {item.login} </Text>
        <Text style={[styles.title, styles.bold]}> Name : {item.name || "No name found"} </Text>
        </TouchableOpacity>
        <Text style={styles.description}> Description: {item.description || "No description available"} </Text>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('List', {listType: "follower", user: item.login, title:"Followers list"})}>
            <Text>{item.followers} followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('List', {listType: "following", user: item.login, title: "Following List"})}>
            <Text>{item.following} following</Text>
            </TouchableOpacity>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    avatar:{
        width: "100%", 
        height: 200,
        alignItems: "center",
    },
    username: {
      paddingVertical: 10
    },
    item: {
      borderColor: variables.colors.grey,
      borderWidth: 1,
      padding: 10,
      flex: 1,
      backgroundColor: '#f6f8fa',
      marginVertical: 5,
      color: variables.colors.primary,
      borderRadius: 5,
    },
    followButton: {
        padding: 10, 
        marginTop: 5, 
        borderRadius: 5, 
        borderWidth:1, 
        borderColor:"black"
    },
    title: {
      lineHeight: 20,
      fontSize: 14,
      fontColor: variables.colors.primary
    },
    description: {
      lineHeight: 20,
      fontSize: 13,
      fontColor: variables.colors.darkGrey
    },
    bold: {
      fontWeight: "700"
    },
    userName: {
      marginRight: 10,
      fontSize: 11,
      fontColor: variables.colors.darkGrey
    },
});