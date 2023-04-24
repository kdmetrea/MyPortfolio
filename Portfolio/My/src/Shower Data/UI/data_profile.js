import React from "react"

function Data_Profile(props){
    return(<div className="card">
                <div className="imgBox">
                    <img src={props.data.Photo}/>
                </div>
                <div className="details">
                    <h3>
                        {props.data.user.username}<br/>
                    </h3>
                    <h4>Biograhia</h4>
                    <p>{props.data.Bio}</p>
            </div>
        </div>)
}
export default Data_Profile