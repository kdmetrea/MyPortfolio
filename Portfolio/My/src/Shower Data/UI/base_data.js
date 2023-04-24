import React from "react"

function Base_Data(props){
    return(<div className="card">
                <div className="ImageUser">
                    <img src={props.data.Photo}/>
                </div>
                <div className="Username">{props.data.user.username}</div>
                <div className="Data">
                    <br/>
                    {props.data.Bio}
                    <div className="BtnProfile">
                    <a href={'/Profile/'+props.data.user.username+'/Page/'}>Page</a>
                    <a href={'/Profile/'+props.data.user.username}>Profile</a>
                    </div>
                </div>
        </div>)
}
export default Base_Data