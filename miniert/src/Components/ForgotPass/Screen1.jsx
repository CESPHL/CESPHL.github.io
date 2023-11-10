import React from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import key from '../Assets/Key.svg';
import person from '../Assets/Person.svg';
import nvmail from '../Assets/navbar_email.svg';
import lock from '../Assets/Lock.svg';
import fpassemail from '../Assets/forget-pass email.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';
import checkchange from '../Assets/Check_ring.svg';

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
                    <img src= {main}/><span>Collabera Digital <br/>
                    External Resource Timesheet</span>
                    </div>
                <div className="list">
                <div class="item">
                    <img src = {person} alt=""/> <span>Email confirmation</span><br/>
                    <span className="subtitle"> Provide your email for resent instructions.</span><br/>
                    <img src = {nvmail} alt=""/> <span> Email Sent</span><br/>
                    <span className="subtitle">Reset Password link has been sent.</span><br/>
                    <img src ={bubble} alt=""/><span> New Password Details</span><br/>
                    <span className="subtitle">Input your new password in the field.</span><br/>
                    <img src={check} alt=""/> <span>Reset Complete</span><br/>
                    <span className="subtitle">Your password has been updated.</span>
                </div>
                </div>
                </div>
            </div>
            <form action ="">
                <div className ="padding">
                <img src = {key} alt=""/><br/>
                <span className="forgot"> Forgot Password? </span> 
                </div>
                <div className="subheading">Enter your email to receive reset instructions</div>
                <div className="forgot-pass">
                    <label>Email</label> <br/>
                    <input type = "email" placeholder='Enter email' required/>
                </div>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow}/><span>Back to Log In</span></button>
                    </div>
            </form>
            </div>
                
    )
}