import React from "react"; 
import Topbar from "../components/topbar.js"
import ".././styles/ManageCamera.css";
import "../components/removecams.js";
import { Link } from "react-router-dom";


//import {useGoogleLogin} from "@react-oauth/google";

const ManageCamera = () => {
/*    const googSignIn=useGoogleLogin({
        onSuccess:(res)=>{
            console.log("res",res);
            alert("Login Successful");
        },
    });*/
    return (
        <div class="ManageCamera">
            <Topbar />
            <div class="contain">
            <div class="addCam">
                <Link to ='../SetUpCams'>
                    <button class="add"> 
                        <p1>Add Camera</p1>
                </button>
                </Link>
            </div>
            <div class="space-btwn">
            </div>
            <div class ="remCam">
                <Link to ='../RemoveCams'>
                    <button class="rem">
                        <p1>Remove Camera</p1>
                    </button>
                </Link>
            </div>
            </div>
        </div>


    );

};
export default ManageCamera;