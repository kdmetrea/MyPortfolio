import axios from "axios";
export async function HiddeForm(state){
    document.querySelector('.Wrapper').style.display = "none"
    state.setClick(!state.click)
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