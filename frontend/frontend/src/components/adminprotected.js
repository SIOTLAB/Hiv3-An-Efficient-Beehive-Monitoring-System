import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'

const AdminProtected = ({children}) => {
    const {user} = UserAuth();
    const current_user = user.email;
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const checkMembersInRole = (role, userEmail)  => {
        return fetch(`https://hiv3-app-1abe045e0a88.herokuapp.com/findmember?role=${encodeURIComponent(role)}&current_user=${encodeURIComponent(userEmail)}`)
             .then(response => response.json())
             .then(data=> {
                 console.log(data.message);
                 return data.message.includes("Member exists in role");
             })
             .catch(error => {
                 console.error('Error', error);
                 return false;
             });
     }

     const fetchUpperRoles = async () => { 
        try {
            const isGuest = await checkMembersInRole('Guest', current_user);
            if(isGuest) {
                console.log("The user is a guest", current_user)
                setShouldRedirect(true);
            }
            else {
                console.log("The user is upper role")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }
    useEffect(() => {
        fetchUpperRoles();
    }, [current_user])

    if(shouldRedirect) {
        return <Navigate to='/' />;
    }
    return children
};

export default AdminProtected;