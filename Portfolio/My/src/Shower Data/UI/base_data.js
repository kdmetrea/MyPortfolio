import React from "react"
import {MdPerson} from "react-icons/md";

function Base_Data(props){
    const staticPath = document.getElementById("favicon").href.split('favicon')[0]
    return(<div className="card">
                <div className="ImageUser">
                    {props.data.Photo?<img src={props.data.Photo}/>:<MdPerson size={100}/>}
                </div>
                <div className="Username">{props.data.user.username}</div>
                <div className="Data_base">
                    {props.data.Bio}
                    <div className="BtnProfile">
                    <a href={'/Profile/'+props.data.user.username+'/Page/'}>Page</a>
                    <a href={'/Profile/'+props.data.user.username}>Profile</a>
                    </div>
                </div>
        </div>)
}
export default Base_Data