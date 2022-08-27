import axios from 'axios';
import { useState } from 'react';

const useGithub = () => {
    const [user, setUser] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isFirstFetch, setIsFirstFetch] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [userData, setUserData] = useState([]);
    
    const searchUsers = (param) => {
        setIsFetching(true);
        setIsFirstFetch(false);
        axios({
            method: 'get',
            url: `https://api.github.com/users/${param}`
        })
        .then((response) => {
            if(response?.data) {
                setUser([response.data])
            } else {
                setUser([])
            }
            setIsFetching(false);
        }).catch((error) => {
            setUser([])
            setIsFetching(false);
        });
    }

    const getUserData = (param) => {
        axios({
            method: 'get',
            url: `https://api.github.com/users/${param}`
        })
        .then((response) => {
            if(response?.data?.length) {
                setUserData(response.data)
            } else {
                setUserData([])
            }
        }).catch((error) => {
           setUserData([])
        })
    }

    const getFollowers = (param) => {
        axios({
            method: 'get',
            url: `https://api.github.com/users/${param}/followers`
        })
        .then((response) => {
            if(response?.data?.length) {
                setFollowers(response.data)
            } else {
                setFollowers([])
            }
        }).catch((error) => {
           setFollowers([])
        })
    }

    const getFollowing = (param) => {
        axios({
            method: 'get',
            url: `https://api.github.com/users/${param}/following`
        })
        .then((response) => {
            if(response?.data?.length) {
                setFollowing(response.data)
            } else {
                setFollowing([])
            }
        }).catch((error) => {
            setFollowing([])
        })
    }

    return {
        isFetching,
        isFirstFetch,
        user, 
        searchUsers,
        followers,
        getFollowers,
        following,
        getFollowing,
        userData,
        getUserData
    };
}

export default useGithub;