import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import useGithub from '../hooks/useGithub';
import { variables } from '../Utils/constants';
import { Formik } from 'formik';
import UserProfile from '../components/UserProfile';

export default function HomeScreen(){

    const { isFirstFetch, isFetching, user, searchUsers} = useGithub();
    
    const renderItem = ({ item }) => (
      <UserProfile item={item}/>
    );
  
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ searchText: '' }}
                    onSubmit={values => searchUsers(values.searchText)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.searchBarContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder="Search GitHub users"
                        value={values.searchText}
                        onChangeText={handleChange('searchText')}
                        onBlur={handleBlur('searchText')}
                        onSubmitEditing={handleSubmit}
                        />
                        <TouchableOpacity style={styles.searchBtn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                </Formik>
                {!isFetching ? <View style={styles.listContainer}>
                    {user.length ? 
                    <FlatList
                        data={user}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={styles.list}
                    /> 
                    : <View style={styles.resultTextContainer}>
                        <Text style={styles.resultText}>{isFirstFetch ? "GitHub users" : "Not found!"}</Text>
                    </View>}
                </View> 
                : <ActivityIndicator size="large" style={styles.activityIndicator}/>} 
            </View>
        </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: "100%"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10,
    },
    input: {
      width:"80%",
      borderWidth: 1,
      color: variables.colors.darkGrey,
      borderColor: variables.colors.grey,
      backgroundColor: variables.colors.secondary,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 16
    },
    searchBarContainer: {
      display:"flex", 
      flexDirection:"row"
    },
    searchBtn: { 
      justifyContent: "center", 
      backgroundColor: variables.colors.primary, 
      borderRadius: 5, 
      paddingHorizontal: 10
    },
    btnText: {
      color:"#fff"
    },
    listContainer: {
      width: "100%",
      marginTop: 5
    },
   resultTextContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90%",
    },
    resultText: {
      color: variables.colors.darkGrey,
    },
    activityIndicator: {
      marginTop: 200
    }
});
  