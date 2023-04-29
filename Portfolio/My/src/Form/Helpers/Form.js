import axios from "axios";
import {create} from "zustand"

export const useFormStore = create((set)=>({
    Error:'',
    clickRegister:false,
    clickForgot:false,
    clickNewPass:false,
    clickLogin:true,
    setClickLogin: (click) => set(() => ({clickLogin:click})),
    setClickRegister: (click) => set(() => ({clickRegister:click})),
    setClickForgot: (click) => set(() => ({clickForgot:click})),
    setClickNewPass: (click) => set(() => ({clickNewPass:click})),
    setError: (error) => set(() => ({Error:error}))
        }
    )
)
export async function HiddeForm(setClick,click){
    setClick(!click)
}
export async function GetApiForSubmit(e,endPath,Post,setError){
    await e.preventDefault()
    await axios.post(location.protocol+'//'+location.host+endPath,Post
    ).then((data)=>{
    if(data.data == ''){
        location.reload()}
    else{
        setError(data.data)
            }
        }
    )
}
export async function decodePhoto(text,setPhoto){
    let file = text.target.files[0] 
        if (file) {
        var reader = new FileReader();
        reader.onload = setPhoto(btoa(e.target.result));
        reader.readAsBinaryString(file)
    }

}