import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useGithub from "../hooks/useGithub";
import { variables } from "../Utils/constants";

export default function ListScreen({navigation, route}){
    const { listType, user } = route.params;
    const { followers, getFollowers, following, getFollowing } = useGithub();
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        if(listType === "follower"){
            getFollowers(user);
        } else {
            getFollowing(user);
        }
    }, [])

    useEffect(() => {
        console.log("followers", followers);
        setUsersList(followers)
    }, [followers])

    useEffect(() => {
        setUsersList(following)
    }, [following])

    const renderItem = ({ item }) => (
        <Item item={item}/>
    );

    const Item = ({item}) => (
        <View style={styles.item}>
          <TouchableOpacity  onPress={() => navigation.navigate('Profile', {user: item.login})}>
              <View style={styles.avatar}>
                  <Image  style={{height:200, width:200}} source={{ uri: `${item.avatar_url}`}}/>
              </View>
            <Text style={[styles.username, styles.bold]}> Username : {item.login} </Text>
          </TouchableOpacity>
        </View> 
    );

    return (
        <View style={styles.listContainer}>
           {usersList.length ? 
                <FlatList
                    data={usersList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                /> 
                : <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>"Not found!"</Text>
                </View>}
            
        </View> 
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        marginTop: 20,
        alignItems: "center"
    },
    avatar:{
        width: "100%", 
        height: 200,
        alignItems: "center"
    },
    username: {
      paddingVertical: 10,
      fontSize: 12,
      fontColor: variables.colors.darkGrey,
      textAlign: "center"
    },
    list:{
        width: "90%"
    },
    item: {
      borderColor: variables.colors.grey,
      borderWidth: 1,
      padding: 20,
      flex: 1,
      width: "100%",
      backgroundColor: '#f6f8fa',
      marginVertical: 10,
      color: variables.colors.primary,
      borderRadius: 5
    },
    bold: {
      fontWeight: "700"
    },
    resultTextContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    resultText: {
      color: variables.colors.darkGrey,
    }
});
  