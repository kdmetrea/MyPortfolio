import React, { useState } from "react"
import { MdEmail, MdKey,MdPerson,MdClose,MdFilePresent,MdImage } from "react-icons/md";
import { HiddeForm,GetApiForSubmit,decodePhoto } from "../Helpers/Form";
import Form_Login from "./form_login";

function Form_Register(props){
    var [click,setClick] = useState(false)
    var [Error,setError] = useState()
    var [Photo,setPhoto] = useState()

    return(<React.StrictMode>
        {click?<Form_Login/>:''}
        <div className = "Wrapper WrapperRegister">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm()
        }}>
        <MdClose/>
        </span>
            <div className = 'Form Register'>
    <h2>Register</h2>
    <form onSubmit=
        {(e)=>{
            const username = e.target[1].value
            const password = e.target[4].value
            if (username.length>4&&password.length>4){
                GetApiForSubmit(e,
                    "/api/V1/AdditionToUsers/admin/",
                    {"user":{'password' : password,
                    'username' : username,
                    'email' : e.target[2].value,},
                    'Bio' : e.target[3].value,
                    'Photo' : Photo,
                    'HTMLCode' : ''},setError)
           }
           else{setError('Слишком короткий Логин или Пароль')}
       }
   }
>
        <div className="Input-Box">
            <span className="Icon"><MdImage/></span>
            <input type = "file" accept=".jpg, .jpeg, .png" onChange={(text)=>decodePhoto(text,setPhoto)}></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdPerson/></span>
            <input type = "text" placeholder="Login"></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdEmail/></span>
            <input type = 'email' placeholder='Email'></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdFilePresent/></span>
            <input type = "text" placeholder="Bio"></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdKey/></span>
            <input type = "password" placeholder="Password"></input>
        </div>
        <div className="Forgot">
        {Error}
        </div>
        <button type="submit" className="RegBut">Register</button>
    
        <div className="Сoup">
                <p>Have an account?:
                    <a href="#" className="reg-link" onClick={()=>{
                    setClick(true)
                    HiddeForm()
                }}>Login</a>
                </p>
        </div>
    </form>
</div>
</div>
</React.StrictMode>)
}
export default Form_Register