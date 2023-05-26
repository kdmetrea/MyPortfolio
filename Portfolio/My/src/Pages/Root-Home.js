import React, { useState } from "react"
import { GetData } from "./Helpers/Home"
import Menu from "../Menu/Menu"

function Root_Home(props){
var [Data,setData] = useState([])
        GetData(props,Data,setData)
        if(Data.length != 0){
            return(<div className="Root">
                <Menu Logo = {Data}/>
            </div>)
            }
        else{
            return(<div className="Root">
                <Menu/>           
            </div>)}
            }
export default Root_Home