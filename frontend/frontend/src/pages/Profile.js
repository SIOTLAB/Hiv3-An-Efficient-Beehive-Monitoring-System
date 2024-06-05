import React, {useState} from "react"; 
import AdminPopup from "../components/adminpopup.js"
import Account from "../components/account.js"
const Profile = () => {
    const [adminPopup, setAdminPopup] = useState(false);
    return (
        <div>
            <Account setAdminPopup={setAdminPopup}/>
            <div>
                {adminPopup ? <AdminPopup setAdminPopup={setAdminPopup}/> : <></>}
            </div>
        </div>
    )
}

export default Profile;