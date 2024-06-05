import React, { useState, useEffect } from 'react';

const RoleList = () => {
    const [roles, setRoles] = useState([]);


    useEffect(() => { 
        fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/rolelist')
            .then(reponse=>reponse.json())
            .then(data=> {
                console.log(data);
                setRoles(data); //setRoles gets data from fetch
            })
            .catch(error => console.error('Error fetching roles:', error));
    }, []);

   // console.log("Roles", roles);
   // console.log("Roles Roles", roles[0].Roles[2].Emails); //Emails of Guest

    return (
        <div>
            {roles.map((roleContainer, index) => ( //roles[0]
                <div key = {index}>
                    {roleContainer.Roles.map((role, roleIndex) => (
                        <div key = {roleIndex}> 
                            <h2>{role.Role}</h2>
                            <ul>
                                {role.Emails.map((email, emailIndex) => (
                                    <li key={emailIndex}>{email}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

      
          

}

export default RoleList;