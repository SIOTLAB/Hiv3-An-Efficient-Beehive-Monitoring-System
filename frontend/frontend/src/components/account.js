import React, {useState, useEffect} from "react"; 
import { UserAuth } from '../context/AuthContext';
import ".././styles/Account.css"
import Topbar from "../components/topbar.js"

const Account = ({setAdminPopup}) => {

    const {user, logOut } = UserAuth();
    const [userisadmin, setUserIsAdmin] = useState(false);
    const [userisowner, setUserIsOwner] = useState(false);
    const current_user = user.email;

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
            const isOwner = await checkMembersInRole('Owner', current_user);
            const isAdmin = await checkMembersInRole('Admin', current_user);
            if(isOwner) {
                setUserIsOwner(true);
            } else if(isAdmin) {
                setUserIsAdmin(true);
            }
            else {
                console.log("The user is not upper role")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUpperRoles();
    })

    return (
   
        <div>
            <Topbar />
            <div className='PositionBox'>
                <div className='OrangeBox'>
                    <h1 className='Profile'>Profile Details</h1>
                    <br />
                    <br />
                    <img src={user?.photoURL} className="UserPhoto" />
                    <br />
                    <br /> 
                    <div className='UserDetails'>
                        <p>Welcome, {user?.displayName}</p> 
                        <p>Email: {user?.email}</p>
                    </div>
                    {(userisadmin || userisowner) && <button onClick={()=>setAdminPopup(true)}>Admin Config</button>} 
                    <button onClick={handleSignOut} className="SignOutButton">Logout</button>
                </div>
            </div>
        </div>
    )
}
export default Account;


/*
  {user?.displayName ? (  //Currently viewing account, you should only be logged in but this is a test before we add in protected pages
                <button onClick={handleSignOut}>Logout</button>
            ) : ( 
                <Link to='/signin'>Sign In</Link>
            )}
*/