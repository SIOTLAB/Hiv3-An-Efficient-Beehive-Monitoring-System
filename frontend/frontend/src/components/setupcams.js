import Topbar from "./topbar.js"
import { Component } from "react";
import ".././styles/setupcams.css";
import AddressList from "../components/addresslist.js"
class SetUpCams extends Component{
    //var cam_add=document.getElementById("search").val();
    constructor(ops) {
        super(ops);
        this.state ={
            name:null,
            address:null
        }  
        this.handleSubmit=this.handleSubmit.bind(this); 
      }
    handleChange=(e)=>{
        switch(e.target.id){
            case("name"):
                this.setState({name:e.target.value});
                break;
            case("ip"):
                this.setState({address:e.target.value});
                break;
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = {
            name: this.state.name,
            address: this.state.address
        };
        const url = "https://hiv3-app-1abe045e0a88.herokuapp.com/addaddress";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            });
            if(response.ok) {
                alert(
                'Added Camera \n'+
                'Name: '+ this.state.name+"\n"+
                'Ip Address: '+ this.state.address
                )    
            } else {
                alert('Failed to add address/name');
            }
        } catch (error) {
            console.error('Failed to send data:', error);
            alert('Failed to send data to server');
        }
    }

    render(){
        return(
            <form>
                <div class="page_container">
                    <Topbar/>
                    
                    <div class="text_container">
                        <div className = "instructions">
                            <h1>Pre-required instructions</h1>
                            <ol>
                                <li>Ensure you have <a href="https://www.amazon.com/Aideepen-ESP32-CAM-Bluetooth-ESP32-CAM-MB-Arduino/dp/B08P2578LV/ref=asc_df_B08P2578LV/?hvadid=647118588855&hvdev=c&hvdvcmdl=undefined&hvlocint=undefined&hvlocphy=9032180&hvnetw=g&hvpone=undefined&hvpos=undefined&hvptwo=undefined&hvqmt=undefined&hvrand=4401102789133920589&hvtargid=pla-1244615975658&linkCode=df0&mcid=10708a21a2ec3068bdacf8808d4bda8a&tag=hyprod-20&th=1">
                                ESP-32 Camera with Sister board</a> and an appropriate length <a href="https://www.amazon.com/dp/B071S5NTDR/ref=twister_B072FHJVT2?_encoding=UTF8&th=1">
                                USB-A to Micro-USB cable</a> (this cable can be used for the connection to the battery)</li>
                                <li>Verify your computer has COM Port capabilities (most Windows product will automatically have this)</li>
                                <li>Download the latest <a href="https://www.arduino.cc/en/software"> Arduino IDE </a></li>
                                <li>After installation of Arduino IDE, in the boards manager search Espressif and install esp32 </li>
                            </ol>
                            <h1>Setting up Camera's IP address</h1>
                            <ol>
                                <li>Connect your ESP-32 Camera with the sister board, and plug the MicroUsb cable into the sister board and the USB A into the computer</li>
                                <li>Start the Arduino IDE software</li>
                                <li>Under Tools select the available port by hovering over the Port option</li>
                                <li>Similarly change the Partition Scheme to HugeAPP</li>
                                <li>Finally under tools change the board to AI-Thinker ESP32-CAM</li>
                                <li>Utilizing CameraWebServer example make sure the only uncommented version is the AI-Thinker </li>
                            </ol>
                        </div>
                        <div class = "stack">
                        <div class = "u_input">
                            <h1>Enter the Name of your camera and IP address here</h1>
                            <input value={this.state.name} onChange={this.handleChange} type="text" id="name" placeholder="Name"/>
                            <input value={this.state.address} onChange={this.handleChange} type="text" id="ip" placeholder="0.0.0.0"/>
                            <button onClick={(e)=>this.handleSubmit(e)}>Confirm</button>
                            <p1><br/>Cameras added will be displayed on the table and <br/>LiveViews available on the homepage</p1>
                        </div>
                        <div class="table">
                        <AddressList />
                    </div>
                    </div>
                        </div>
                </div>
            </form>
        );
    }
}
export default SetUpCams;