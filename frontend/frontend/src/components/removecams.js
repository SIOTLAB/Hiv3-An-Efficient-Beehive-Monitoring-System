import Topbar from "./topbar.js"
import { Component } from "react";
import ".././styles/removecams.css";

class RemoveCams extends Component{
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
        this.setState(
            ()=>alert(
            'Added Camera \n'+
            'Name: '+ this.state.name+"\n"+
            'Ip Address: '+ this.state.address
            )
        );
    }
    render(){
        return(
            <form>
                <div class="page_container">
                    <Topbar/>
                    
                    <div class="text_container">
                        <div className = "instructions">
                            <h1>Removal of Camera</h1>
                            <ol>
                                <li>Ensure you have a desired camera you wish to remove</li>
                                <li>Take note of the name and IP address you assigned the camera</li>
                                <li>Enter the exact camera name and IP address</li>
                            </ol>
                        </div>
                        <div class = "stack">
                        <div class = "u_input">
                            <h1>Enter the Name of your camera and IP address here</h1>
                            <input value={this.state.name} onChange={this.handleChange} type="text" id="name" placeholder="Name"/>                          
                            <button onClick={(e)=>this.handleSubmit(e)}>Confirm</button>
                            <p1><br/>Cameras removed will be reflected on the table and <br/>LiveViews available on the homepage</p1>
                        </div>
                        <div class="table">
                        <table>
                            <tr>
                            <th> Names</th>
                            <th> IP Address</th>
                            </tr>
                            <tr>
                                <th>Alpha</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Bravo</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Charlie</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Delta</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Echo</th>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                    </div>
                        </div>
                </div>
            </form>
        );
    }
}
export default RemoveCams