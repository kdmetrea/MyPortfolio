import React from "react"
import Menu from "../Menu/Menu"


class Root_Profile extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        Data:[]
    }
}
    render(){ 
    return(<div className="Root">
            <Menu/>
    </div>)}
}
export default Root_Profile