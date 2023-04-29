import Form_Login from "./UI/form_login";
import css from './Css/main.css'
import React from "react"
import Form_Register from "./UI/form_register";
import { useFormStore } from "./Helpers/Form";
import Form_Forgot from "./UI/form_forgot";

function Form(props){
    const state = useFormStore()
    return (<React.StrictMode>
        {state.clickLogin?<Form_Login state = {props.Userstate}/>:''}
        {state.clickRegister?<Form_Register state = {props.Userstate}/>:''}
        {state.clickForgot?<Form_Forgot state = {props.Userstate}/>:''}
    </React.StrictMode>)
}
export default Form