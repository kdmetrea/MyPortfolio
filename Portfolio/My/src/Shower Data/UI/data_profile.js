import React from "react"
import {MdImageNotSupported} from "react-icons/md";

function Data_Profile(props){
    const staticPath = document.getElementById("favicon").href.split('favicon')[0]
    console.log(staticPath)
    return(
    // <div className = "Profile">
    //     <div className="Image">{props.User.Photo?
    //         <img src={props.User.Photo}/>:
    //         <MdImageNotSupported/>}
    //     </div>
    //     <div className="Data">
    //         <div className="Name">
    //             <div className="Login">
    //                 {props.User.user.username}
    //             </div>
    //             <div className="Real_Name">
    //                 {props.User.user.first_name}{props.User.user.last_name}
    //             </div>
    //         </div>
    //         <div className="Bio">
    //         {props.User.Bio}
    //         </div>
    //     </div>
    //     <div className="HTML" dangerouslySetInnerHTML={{__html:props.User.HTML}}/>
    //     </div>
    // </div>
    <div class="container">
        <h1>User Profile</h1>
        <div class="user-info">
            <div class="profile-picture-container">
            {props.User.Photo?
             <img src={props.User.Photo}/>:
             <MdImageNotSupported/>}
            </div>
            <div class="user-details-container">
                <label>Username:</label>
                <p>{props.User.user.username}</p>
                <label>Real Name:</label>
                <p>{props.User.user.first_name} {props.User.user.last_name}</p>
                <label>Biography:</label>
                <p>{props.User.Bio}</p>
            </div>
        </div>
        <div class="button-container">
            <button>Edit Profile</button>
            <button>Logout</button>
        </div>
    </div>
    )
}
export default Data_Profile