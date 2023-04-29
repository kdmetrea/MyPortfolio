import React from "react"
import { MdEmail,MdPerson,MdClose} from "react-icons/md";
import { HiddeForm,GetApiForSubmit,useFormStore } from "../Helpers/Form";

function Form_Forgot(props){
    const state = useFormStore()

    return(<React.StrictMode>
        <div className = "Wrapper WrapperForgot">
        <span className="Icon-Close" onClick={()=>{
            HiddeForm(props.state.setClick,props.state.click)
            HiddeForm(state.setClickLogin,state.clickLogin)
            HiddeForm(state.setClickForgot,state.clickForgot)
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
            <div className="Forgot">
                {Error}
            </div>
            <button type="submit" className="RegBut" onClick={()=>{
                HiddeForm(state.setClickForgot,state.clickForgot)
                HiddeForm(state.setClickLogin,state.clickLogin)
            }}>Назад</button>
            <button type="submit" className="RegBut">Send Mail</button>
        </form>
    </div>
</div>
</React.StrictMode>)
}
export default Form_Forgot