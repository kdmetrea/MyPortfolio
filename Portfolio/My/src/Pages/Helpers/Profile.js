import axios from "axios"
export function GetDataProfile(props,Data,setData){
    if(Data.length == 0){
        axios.get(location.protocol+'//'+location.host+'/api/V1/YourUserProfile/').then((data)=>{
        if (data.data){
            setData(data.data)
                }
            }
        )
        }
    }