import React from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import key from '../Assets/Key.svg';
import person from '../Assets/Person.svg';
import nvmail from '../Assets/navbar_email.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';

import './main.css';

export default function Screen1(){
    const handleClick =() =>{
        window.location.href ="/";
    };
    const submit =() =>{
        window.location.href ="/sentemail";
    };
    return(
        <div className = "forgot-form">
            <div className="rectangle">
                <div className ="title">            
                    <div className = "main">
                        <img src= {main} alt=""/><span>Collabera Digital<br/>External Resource Timesheet</span>
                    </div>
                <div className="list">
                <div class="item">
                    <img src = {person} alt=""/> 
                    <div className="item1">
                    <h5>Email confirmation </h5>
                    <p> Provide your email for resent instructions.</p>
                    </div>
                    <img src = {nvmail} alt=""/>
                    <div className="item2">
                    <h5>Email Sent</h5>
                    <p>Reset Password link has been sent.</p>
                    </div>
                    <img src ={bubble} alt=""/>
                    <div className="item3">
                    <h5>New Password Details</h5>
                    <p>Input your new password in the field.</p>
                    </div>
                    <img src={check} alt=""/> 
                    <div className="item4">
                    <h5>Reset Complete</h5>
                    <p>Your password has been updated.</p>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <form action ="">
                <div className ="padding">
                    <img src = {key}/><br/>
                    <span className="forgot"> Forgot Password? </span> 
                </div>
                <div className="subheading">
                    Enter your email to receive reset instructions
                </div>
                <div className="forgot-pass">
                    <label>Email</label> <br/>
                    <input type = "email" placeholder='Enter email' required/>
                </div>
                <button className="submit-btn"onClick= {submit}> Submit Email</button>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow} alt="arrow key"/><span>Back to Log In</span></button>
                    </div>
            </form>
            </div>    
    )
}