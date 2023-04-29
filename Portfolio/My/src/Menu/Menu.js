import Header from "./UI/header";
import {useUserStore} from "./Helpers/header";
import css from './Css/main.css'
import Form from "../Form/Form";
import Shower from "../Shower Data/Shower";
import React from "react"

function Menu(props){
    const state = useUserStore()
    return (<React.StrictMode>
        {state.click?
        <Form Userstate = {state}/>:
        state.Data.map((data,i)=><Shower type = {'Base'} data = {data} key = {i}/>)}
        {props.Logo?<Header Logo = {props.Logo}/>:<Header/>}
    </React.StrictMode>)
}
export default Menu