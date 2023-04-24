import Base_Data from "./UI/base_data"
import Data_Profile from "./UI/data_profile"
import React from "react"
import css from './Css/main.css'

function Shower(props){
    return (<React.StrictMode>
        {props.type == 'Base'?<Base_Data data = {props.data} key = {props.i}/>:''}
        {props.type == 'Profile'?<Data_Profile User = {props.User}/>:''}
    </React.StrictMode>)
}
export default Shower