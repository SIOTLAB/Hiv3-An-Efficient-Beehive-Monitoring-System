import React, {useState} from 'react'
import ".././styles/AdminPopup.css"
import Demote from '../components/demoteuser';
import Promote from '../components/promoteuser';
import List from '../components/listroles';

const AdminPopup = ({setAdminPopup}) => {
    const [isPromoted, setIsPromoted] = useState(false); //Demote tab if false
    const [buttonLabel, setButtonLabel] = useState('Demote');

    const handleClick = () => {
        setIsPromoted(!isPromoted); //Switches from false to true/vice versa

        if(!isPromoted) {
            setButtonLabel('Promote');
        }
        else
        {
            setButtonLabel('Demote');
        }
    };
   return (
    <div className ="adminpopup">
        <div className ="popupheader">
            <div className = "sub-section">
                <h1>Add User</h1>
                    <button onClick={handleClick} className="Demote-Promote-Button">{buttonLabel}</button>
                    {isPromoted ? <Promote /> : <Demote />}
            </div>
            <div className ="sub-section">
                <h1>Existing Users</h1>
                <List />
            </div>
            <div className="sub-section">
                <h1>Close</h1>
                <button onClick={()=>setAdminPopup(false)} className="exit-button-section"> X </button>
            </div>
        </div>
    </div>
   )
};

export default AdminPopup;