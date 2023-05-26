import React, { useEffect, useState } from "react"
import { MdEmail, MdKey,MdPerson,MdClose,MdFilePresent,MdImage,MdFace,MdFaceRetouchingNatural } from "react-icons/md";
import { HiddeForm,GetApiForSubmit,decodePhoto,useFormStore } from "../Helpers/Form";

function Form_Register(props){
    let [Photo,setPhoto] = useState()
    const state = useFormStore()
    return(<React.StrictMode>
        <div className = "Wrapper WrapperRegister">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm(props.state.setClick,props.state.click)
            HiddeForm(state.setClickLogin,state.clickLogin)
            HiddeForm(state.setClickRegister,state.clickRegister)
        }}>
        <MdClose/>
        </span>
            <div className = 'Form Register'>
    <h2>Register</h2>
    <form onSubmit=
        {(e)=>{
            const username = e.target[1].value
            const password = e.target[6].value
            if (username.length>4&&password.length>4){
                GetApiForSubmit(e,
                    "/api/V1/AdditionToUsers/admin/",
                    {"user":{'password' : password,
                    'first_name':e.target[2].value,
                    'last_name':e.target[3].value,
                    'username' : username,
                    'email' : e.target[4].value,},
                    'Bio' : e.target[5].value,
                    'Photo' : Photo,
                    'HTMLCode' : ''},state.setError)
           }
           else{setError('Слишком короткий Логин или Пароль')}
       }
   }
>
        <div className="Input-Box Photo">
            <span className="Icon"><MdImage/></span>
            <input type = "file" accept=".jpg, .jpeg, .png" onChange={(text)=>{decodePhoto(text,setPhoto)}}></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdPerson/></span>
            <input type = "text" placeholder="Login"></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdFace/></span>
            <input type = "text" placeholder="first name"></input>
        </div>
        <div className="Input-Box">
            <span className="Icon"><MdFaceRetouchingNatural/></span>
            <input type = "text" placeholder="last name"></input>
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
                    HiddeForm(state.setClickRegister,state.clickRegister)
                    HiddeForm(state.setClickLogin,state.clickLogin)
                }}>Login</a>
                </p>
        </div>
    </form>
</div>
</div>
</React.StrictMode>)
}
export default Form_Register