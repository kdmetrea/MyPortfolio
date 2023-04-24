import axios from "axios"
export function GetData(props,Data,setData){
    if(Data.length == 0){
        if (props.User){
            axios.post(location.protocol+'//'+location.host+"/api/V1/Search/",{'Slug':props.User}).then((data)=>{
            if (data.data){
            setData(data.data)
            }
        }
    )
}
        else{
            axios.get(location.protocol+'//'+location.host+'/api/V1/YourUserHome/').then((data)=>{
        if (data.data){
            setData(data.data)
                }
            }
        )
        }
    }
}