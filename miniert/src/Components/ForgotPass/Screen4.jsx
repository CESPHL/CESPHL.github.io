import React from "react";
import main from '../Assets/Framemain.svg';
import person from '../Assets/Person.svg';
import nvmail from '../Assets/navbar_email.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';
import checkchange from '../Assets/Check_ring.svg';

import './screen4.css';

export default function Screen1(){
    const handleClick =() =>{
        window.location.href ="/";
    };
    const open =() =>{
        window.location.href ="/resetpass";
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
            <div className="form-group">
            <form action ="">
                <div className ="padding">
                    <img src = {checkchange}/><br/>
                    <span className="forgot"> Password has been changed! </span> 
                </div>
                <div className="subheading">
                    Your password has been successfully updated. Click below<br/>
                    to log in to your account.
                </div>
                <button className="submit-btn" onClick={handleClick}> Back to log in</button>
            </form>
        </div>
    </div>
    )
}