import React from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import person from '../Assets/Person.svg';
import nvmail from '../Assets/navbar_email.svg';
import lock from '../Assets/Lock.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';

import './screen3.css';

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
                            <div>
                                <img src = {person} alt=""/> 
                                <div className="item1">
                                    <h5>Email confirmation </h5>
                                    <p>Provide your email for resent instructions.</p>
                                </div>
                            </div>
                            <div>
                                <img src = {nvmail} alt=""/>
                                <div className="item2">
                                    <h5>Email Sent</h5>
                                    <p>Reset Password link has been sent.</p>
                                </div>
                            </div>
                            <div>
                                <img src ={bubble} alt=""/>
                                <div className="item3">
                                    <h5>New Password Details</h5>
                                    <p>Input your new password in the field.</p>
                                </div>
                            </div>
                            <div>
                                <img src={check} alt=""/> 
                                <div className="item4">
                                    <h5>Reset Complete</h5>
                                    <p>Your password has been updated.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="footer"> 
                        <span>Collabera Digital 2023</span>
                    </div>
            </div>
            <form action ="">
                <div className ="padding">
                    <img src = {lock}/><br/>
                    <span className="forgot"> Set new Password</span> 
                </div>
                <div className="subheading">
                    Reset your password by inputting a new one. It must be different from <br/>your
                    previously used passwords.
                </div>
                <div className="forgot-pass">
                    <label>New Password</label> <br/>
                    <input type = "password" placeholder='••••••••' required/><br/><br/>
                    <label>Confirm Password</label> <br/>
                    <input type = "password" placeholder='••••••••' required/>
                </div>
                <div className="conditions">
                    <p>Must be at least 8 characters</p>
                    <p>Must contain one special character</p>
                </div>
                <button className="submit-btn"onClick= {submit}>Reset Password</button>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow} alt="arrow key"/><span>Back to Log In</span></button>
                    </div>
            </form>
            </div>    
    )
}