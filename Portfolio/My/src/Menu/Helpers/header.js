import axios from "axios"
import {create} from "zustand"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
const Path = location.protocol+'//'+location.host 

export const useUserStore = create((set)=>({
    click:false,
    Data:[],
    setData: (data) => set(() => ({Data:data})),
    setClick: (click) => set(() => ({click:click})),
        }
    )
)
export async function Search(Input,setData){
    await axios.post(Path+"/api/V1/Search/",{"Slug":Input}).then((data)=>{
        if(data.data.length!==0){
        setData(data.data)}
        else{setData([])}
                    }
    )
}
export async function ChangeInput(el,search,setData){
    return await search(el.target.value,setData)
}
export async function Exit(){
    await axios.get(Path+'/api/V1/ExitUser/').then(()=>{location.reload()})
}
export function setBlackTheme(){
    document.documentElement.style.setProperty('--color','#3e3e3e')
    document.documentElement.style.setProperty('--color-hov','#345858')
    document.documentElement.style.setProperty('--recolor','wheat')
    if(document.getElementById("favicon").href.includes('_white'))
        {document.getElementById("favicon").href = document.getElementById("favicon").href.replace('_white','')}
}
export function getUser(Logo){
    if(Logo){
        if(Logo.length > 5){
        return Logo.slice(0,5)+'...'
        }
        else{
            return Logo
        }
    }
}
export async function ChangeTheme(cookie){
    if(await cookie.get('theme')=='true'){
        setBlackTheme()
        await cookie.set('theme',false,{path:"/"}) 
    }
    else{
        setWhiteTheme()
        await cookie.set('theme',true,{path:"/"})}
}
export function setWhiteTheme(){
    if(!document.getElementById("favicon").href.includes('_white'))
        {document.getElementById("favicon").href = document.getElementById("favicon").href.split('favicon')[0]+"favicon_white"+document.getElementById("favicon").href.split('favicon')[1]}
    console.log(document.getElementById("favicon").href.split('favicon')[0])
    document.documentElement.style.setProperty('--color','wheat');
    document.documentElement.style.setProperty('--color-hov','aliceblue');
    document.documentElement.style.setProperty('--recolor','#3e3e3e')
}
export async function setClickForLogin(state,Logo){
    if(!Logo){
    state.setClick(!state.click)
}
    else{
    Exit()
    }
}