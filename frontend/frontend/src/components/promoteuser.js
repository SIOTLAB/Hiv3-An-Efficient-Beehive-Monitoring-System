import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";
import PromoteAdmin from '../components/promoteadmin'

const PromoteUser = () => {
    const [banneddata, setBannedData] = useState([]);
    const [bannedselect, setBannedSelect] = useState();
    const [bannedbutton, setBannedButton] = useState(false);

    const {user} = UserAuth();
    const current_user = user.email;
    const [isuserowner, setIsUserOwner] = useState(false);

    const fetchBannedEmails = async () => {
        try {
            const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/fetchrole?roleName=Banned');
            const [bannedRole] = await response.json();

            if(bannedRole)
            {
                let bannedEmails =[];

                bannedRole.Roles.forEach(member => {
                    for(let i = 0; i< member.Emails.length; i++) {
                        const email = member.Emails[i];
                        const userid = member.Userid[i]; 
                        bannedEmails.push ({
                            key: userid,
                            value: email,
                        });
                    }
                });
                setBannedData(bannedEmails);
            }
        } catch (error) {
            console.error('Failed to fetch ban list', error);
        }
    };

    const handleUnbannedUser = async () => {
        if(!bannedselect)
            return;
        const userId = bannedselect.item.key;
        const userEmail = bannedselect.item.value;

        try {
            const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/unbanuser', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userEmail }),
            });

            const data = await response.json();
            console.log(data.message);

        } catch (error) {
            console.error('Failed to unban user', error);
        }

        setBannedButton(false);
    }

    const handleSelect = (record) => {
        setBannedSelect(record);
        setBannedButton(true);
    }

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

    const fetchOwnerRole = async () => {
        
        try {
            const isOwner = await checkMembersInRole('Owner', current_user);
            if(isOwner) {
                setIsUserOwner(true);
            }
            else {
                console.log("The user is not any role yet")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }

    useEffect(() => {
        fetchBannedEmails();
        fetchOwnerRole();
        
    }, [])

    return(
        <div>
            <br />
            <p>Banned Users</p>
            <ReactSearchBox
                placeholder='Promote User'
                value = "Doe"
                data = {banneddata}
                onSelect={handleSelect}
            />
            {bannedselect && bannedbutton && (
                <div className="promote">
                    <p>Unban {bannedselect.item.value}?</p> 
                    <button onClick={handleUnbannedUser}>Unban User</button>
                    <button onClick={()=>setBannedButton(false)}>No</button>
                </div>
            )}
             {isuserowner && (
                  <PromoteAdmin />
            )}         
        </div>
    )
};

export default PromoteUser;


/* 

        try {
            //Fetching the Guest Role
            const responseGuest = await fetch('http://localhost:3001/Roles?Role=Guest');
            const [guestRole] = await responseGuest.json();
            const updatedGuestMembers = [...guestRole.members, { "aemail": userEmail, "userid": userId}]; 

             //Adding new Member to Guest Role
             await fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedGuestMembers }),
            });

            //Fetching filtered banned list(without the one moved to banned)
            const responseBanned = await fetch('http://localhost:3001/Roles?Role=Banned');
            const [bannedRole] = await responseBanned.json();
            const filteredBannedMembers = bannedRole.members.filter(member => member.userid !== userId);

            //replacing old banned list with new banned list
            await fetch(`http://localhost:3001/Roles/${bannedRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: filteredBannedMembers }),
            });
            console.log(`${userEmail} Unbanned.`)
        } catch (error) {
            console.error('Failed to unban user', error);
        }
*/