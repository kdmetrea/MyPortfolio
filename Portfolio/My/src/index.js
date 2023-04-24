import Root_Home from "./Pages/Root-Home";
import React from 'react'
import css from'./css/main.css'
import * as ReactDOMClient from 'react-dom/client'
import Root_Profile from "./Pages/Root-Profile";
// if (document.getElementById('frontend-Home')){
//     const Home = ReactDOMClient.createRoot(document.getElementById('frontend-Home'))
//     Home.render(<Root_Home/>)
// }

// if (document.getElementById('frontend-Register')){
//     const Register = ReactDOMClient.createRoot(document.getElementById('frontend-Register'))
//     Register.render(<Root_Register/>)
// }
const App = ReactDOMClient.createRoot(document.getElementById('frontend'))
const Url = location.pathname
if(Url.includes('Home')){
    App.render(<Root_Home/>)
}
if(Url.includes('Profile')){
    App.render(<Root_Profile/>)
}
