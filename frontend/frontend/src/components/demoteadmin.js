import React, {useState, useEffect} from 'react'
import ReactSearchBox from "react-search-box";
const DemoteAdmin = () => {
    const [admindata, setAdminData] = useState([]);
    const [adminbutton, setAdminButton] = useState(false);
    const [adminselect, setAdminSelect] = useState();

    const fetchAdminEmails = async () => {
        try {
            const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/fetchrole?roleName=Admin');
            const [adminRole] = await response.json();

            if(adminRole)
            {
                let adminEmails =[];
                adminRole.Roles.forEach(member => {
                    for(let i = 0; i< member.Emails.length; i++) {
                        const email = member.Emails[i];
                        const userid = member.Userid[i]; 
                        adminEmails.push ({
                            key: userid,
                            value: email,
                        });
                    }
                });
                setAdminData(adminEmails);
            }
        } catch (error) {
            console.error('Failed to fetch admin list', error);
        }
    };

    const handleSelect = (record) => {
        setAdminSelect(record);
        setAdminButton(true);
    }

    const handleAdminUser = async (flag) => {
        if(!adminselect)
            return;
        const userId = adminselect.item.key;
        const userEmail = adminselect.item.value;
            if(flag===1)
            {
                try {
                    const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/banadmin', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, userEmail }),
                    });
        
                    const data = await response.json();
                    console.log(data.message);
        
                } catch (error) {
                    console.error('Failed to ban admin', error);
                }
            }
            else if(flag === 0 )
            {
                try {
                    const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/demoteadmin', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, userEmail }),
                    });
        
                    const data = await response.json();
                    console.log(data.message);
        
                } catch (error) {
                    console.error('Failed to demote admin', error);
                }
            }
           
        setAdminButton(false);
    }

    useEffect(() => {
        fetchAdminEmails();
    })
    return (
        <div>
            <br />
            <p>Admin Users</p>
            <ReactSearchBox
                placeholder='Demote User'
                value = "Doe"
                data = {admindata}
                onSelect = {handleSelect}

            />
             {adminselect && adminbutton && (
                <div>
                    <div>
                        <p>Admin to Guest</p>
                        <button onClick={()=>handleAdminUser(0)}>Demote User</button>
                        <button onClick={()=>setAdminButton(false)}>No</button>
                    </div>
                    <div>
                        <p>Admin to Banned</p>
                        <button onClick={()=>handleAdminUser(1)}>Ban User</button>
                        <button onClick={()=>setAdminButton(false)}>No</button>
                    </div>

                 </div>
             )}
        </div>
    )
};
export default DemoteAdmin;