import React from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import person from '../Assets/person-inactive.svg';
import nvmail from '../Assets/email-active.svg';
import fpassemail from '../Assets/forget-pass email.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';

import './screen2.css';

export default function Screen1(){
    const handleClick =() =>{
        window.location.href ="/";
    };
    // Function should open the user's email provider
    // const open =() =>{
    //     window.location.href ="/resetpass";
    // };
    return(
        <div className = "forgot-form">
            <div className="rectangle">
                <div className ="title">            
                    <div className = "main">
                        <img src= {main} alt=""/><span><b>Collabera Digital</b><br/>External Resource Timesheet</span>
                    </div>
                    <div className="list">
                        <div class="item">
                            <div>
                                <img src = {person} alt=""/> 
                                <div className="item1">
                                    <h5 className="page-inactive">Email confirmation </h5>
                                    <p className="page-inactive">Provide your email for resent instructions.</p>
                                </div>
                            </div>
                            <div>
                                <img src = {nvmail} alt=""/>
                                <div className="item2">
                                    <h5 className="page-active">Email Sent</h5>
                                    <p className="page-active">Reset Password link has been sent.</p>
                                </div>
                            </div>
                            <div>
                                <img src ={bubble} alt=""/>
                                <div className="item3">
                                    <h5 className="page-inactive">New Password Details</h5>
                                    <p className="page-inactive">Input your new password in the field.</p>
                                </div>
                            </div>
                            <div>
                                <img src={check} alt=""/> 
                                <div className="item4">
                                    <h5 className="page-inactive">Reset Complete</h5>
                                    <p className="page-inactive">Your password has been updated.</p>
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
            <div className="form-group">
                <div className ="padding">
                    <img src = {fpassemail} alt=""/><br/>
                    <span className="forgot"> Check your email </span> 
                </div>
                <div className="subheading">
                    An email has been sent to ********@collaberadigital.com
                </div>
                <button className="submit-btn" onClick="open"> Open Email</button>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow} alt="arrow key"/><span>Back to Log In</span></button>
                    </div>
                    </div>
            </form>
            </div>
    )
}