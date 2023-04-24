import React from "react"
import { GetData } from "./Helpers/Home"
import Menu from "../Menu/Menu"

class Root_Home extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        Data:[]
    }
    this.setData = this.setData.bind(this)
}
setData =data=>this.setState({Data:data})
    
    render(){
        GetData(this.props,this.state.Data,this.setData)
        if(this.state.Data.length != 0){
            return(<div className="Root">
                <Menu Logo = {this.state.Data}/>
            </div>)
            }
        else{
            return(<div className="Root">
                <Menu/>           
            </div>)}
            }
        }
export default Root_Home