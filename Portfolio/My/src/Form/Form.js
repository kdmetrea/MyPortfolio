import Form_Login from "./UI/form_login";
import css from './Css/main.css'
import React from "react"
import { state } from "../Menu/Menu";

function Form(props){
    return (<React.StrictMode>
        <Form_Login state = {props.Userstate}/>
    </React.StrictMode>)
}
export default Form