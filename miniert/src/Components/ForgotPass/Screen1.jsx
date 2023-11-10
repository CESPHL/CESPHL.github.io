import React from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import key from '../Assets/Key.svg';
import './main.css';

export default function Screen1(){
    const handleClick =() =>{
        window.location.href ="/";
    };
    return(
        <div className = "forgot-form">
            <div className="rectangle">
                <div className ="title">            
                <div className = "main">
                    <img src= {main} alt="An SVG type of file"/><span>Collabera Digital <br/>
                    External Resource Timesheet</span>
                    </div>
                </div>
            </div>
                <div className ="padding">
                <img src = {key} alt="key figure"/><br/>
                <span className="forgot"> Forgot Password? </span> 
                </div>
                <div className="subheading">Enter your email to receive reset instructions</div>
                <div className="forgot-pass">
                    <label>Email</label> <br/>
                    <input type = "email" placeholder='Enter email' required/>
                </div>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow} alt="arrow button"/><span>Back to Log In</span></button>
                    </div>
            </div>
    )
}