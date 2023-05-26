import React, { useEffect, useState } from "react"
import Shower from "../Shower Data/Shower"
import { GetDataProfile } from "./Helpers/Profile"
import Menu from "../Menu/Menu"

function Root_Profile(props){
    var [Data,setData] = useState([])
    GetDataProfile(props,Data,setData)
    if(Data.length != 0){
        console.log(Data)
        return(<div className="Root">
            <Shower  type = {'Profile'} User = {Data}/>
        </div>)
        }
    }
export default Root_Profile