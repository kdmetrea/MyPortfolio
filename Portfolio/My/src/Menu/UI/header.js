import React,{useCallback} from "react"
import {ChangeTheme,ChangeInput,getUser, setClickForLogin,Search,setBlackTheme,setWhiteTheme,Exit, useUserStore} from "../Helpers/header";
import _debounce from 'lodash/debounce';
import Cookies from 'universal-cookie';

function Header(props){
    const state = useUserStore()
    var cookie = new Cookies
    const search = useCallback(_debounce(Search, 500))
    return(<React.StrictMode>
    <div className="Header">
        <header>
            <a href={"/Profile/"+props.Logo} className = 'Logo'>{getUser(props.Logo)}</a>
            <nav className="Navigation">
                <a href="/Home/">Home</a>
                <input onChange={(el)=>{ChangeInput(el,search,state.setData)}}
                     placeholder="🔍Search..."/>
                <label className="switch">
                    {cookie.get('theme')=="true"?
                        setWhiteTheme():setBlackTheme()}
                    <input type="checkbox" defaultChecked={cookie.get('theme')=='true'} onClick={()=>{
                        ChangeTheme(cookie)
                        }
                    }/>
                    <span className="slider"/>
                </label>
                <button className="BtnLogin" onClick = {()=>{
                    setClickForLogin(state,props.Logo)
                    }}>{props.Logo?'Exit':"Login"}</button>
            </nav>
        </header>
        <h1>{state.click}</h1>
      </div>
      </React.StrictMode>)
}
export default Header