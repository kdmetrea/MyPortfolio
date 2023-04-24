import React, { useState } from "react"
import { MdEmail, MdKey,MdPerson,MdClose} from "react-icons/md";
import { HiddeForm,GetApiForSubmit } from "../Helpers/Form";

function Form_Forgot(props){
    var [Error,setError] = useState()

    return(<React.StrictMode>
        <div className = "Wrapper WrapperForgot">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm()
        }}>
        <MdClose/>
        </span>
    <div className = 'Form FormForgot'>
        <h2>Forgot</h2>
        <form onSubmit={(e)=>{
            GetApiForSubmit(e,
                "/api/V1/Forgot/",
                {'username' : e.target[0].value,
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
            <div className="Forgot">
                {Error}
            </div>
            <button type="submit" className="RegBut">Send Mail</button>
        </form>
    </div>
</div>
</React.StrictMode>)
}
export default Form_Forgot