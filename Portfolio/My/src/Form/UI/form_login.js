import React, {useState } from "react"
import { MdEmail, MdKey,MdPerson,MdClose} from "react-icons/md";
import Form_Register from "./form_register";
import Form_Forgot from "./form_forgot";
import { HiddeForm,GetApiForSubmit } from "../Helpers/Form";

function Form_Login(props){
    var [clickRegister,setClickRegister] = useState(false)
    var [Error,setError] = useState()
    var [clickForgot,setClickForgot] = useState(false)

    return(<React.StrictMode>
{clickRegister?<Form_Register/>:''}
{clickForgot?<Form_Forgot/>:''}
        <div className = "Wrapper">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm(props.state)
        }}>
        <MdClose/>
        </span>
    <div className = 'Form Login'>
        <h2>Login</h2>
        <form onSubmit={(e)=>{
            GetApiForSubmit(e,
                "/api/V1/EnterUser/",
                {   'password' : e.target[2].value,
                'username' : e.target[0].value,
                'email' : e.target[1].value,
                },setError)
        }}>
            <div className="Input-Box">
                <span className="Icon"><MdPerson/></span>
                <input type = "text" placeholder="Login"></input>
            </div>
            <div className="Input-Box">
                <span className="Icon"><MdEmail/></span>
                <input type = 'email' placeholder='Email'></input>
            </div>
            <div className="Input-Box">
                <span className="Icon"><MdKey/></span>
                <input type = "password" placeholder="Password"></input>
            </div>
            <div className="Forgot">
                <a onClick={()=>{
                    setClickForgot(true) 
                    HiddeForm(props.state)
                        }}>Forgot password?</a>
                {Error}
            </div>
            <button type="submit" className="RegBut">Login</button>
            <div className="Сoup">
                    <p>Dot`t have an account?:
                        <a className="reg-link" onClick={()=>{
                            setClickRegister(true)
                            HiddeForm(props.state)
                        }}>Register</a>
                    </p>
            </div>
        </form>
    </div>
</div>
</React.StrictMode>)
}
export default Form_Login