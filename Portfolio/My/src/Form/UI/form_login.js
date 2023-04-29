import React from "react"
import { MdEmail, MdKey,MdPerson,MdClose} from "react-icons/md";
import { HiddeForm,GetApiForSubmit, useFormStore } from "../Helpers/Form";

function Form_Login(props){
    const state = useFormStore()

    return(<React.StrictMode>
        <div className = "Wrapper">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm(props.state.setClick,props.state.click)
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
                },state.setError)
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
                    HiddeForm(state.setClickLogin,state.clickLogin)
                    HiddeForm(state.setClickForgot,state.clickForgot)
                        }}>Forgot password?</a>
                {Error}
            </div>
            <button type="submit" className="RegBut">Login</button>
            <div className="Сoup">
                    <p>Dot`t have an account?:
                        <a className="reg-link" onClick={()=>{
                            HiddeForm(state.setClickLogin,state.clickLogin)
                            HiddeForm(state.setClickRegister,state.clickRegister)
                        }}>Register</a>
                    </p>
            </div>
        </form>
    </div>
</div>
</React.StrictMode>)
}
export default Form_Login