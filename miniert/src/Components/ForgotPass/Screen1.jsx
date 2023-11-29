import React, { useState } from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import key from '../Assets/Key.svg';
import person from '../Assets/Person.svg';
import nvmail from '../Assets/navbar_email.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/desktopbubble.svg';

import './main.css';

export default function Screen1(){
    const [email, setEmail] = useState('');
    const handleClick =() =>{
        window.location.href ="/";
    };
    const submit = async (e) => {
        e.preventDefault();
        const backendUrl = "https://cesphl-github-io-backend.vercel.app/forgot-password";
        console.log("Fetching from: ", backendUrl);
        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });
            if (response.ok) {
                console.log("Email sent successfully.");
                window.location.href ="/sentemail";
            }
            else {
                console.log('Failed sending an email.');
            }
        }
        catch (error) {
            console.error("Error during login.", error);
        }
    };
    return(
        <div className = "forgot-form">
            <div className="rectangle">
                <div className ="title">            
                    <div className = "main">
                        <img src= {main} alt=""/><span><b>Collabera Digital</b><br/>External Resource Timesheet</span>
                    </div>
                    <div className="list">
                        <div className="first-item">
                            <div>
                                <img src = {person} alt=""/> 
                                <div className="item1">
                                    <h5 className="page-active">Email confirmation </h5>
                                    <p className="page-active">Provide your email for resent instructions.</p>
                                </div>
                            </div>
                            <div>
                                <img src = {nvmail} alt=""/>
                                <div className="item2">
                                    <h5 className="page-inactive">Email Sent</h5>
                                    <p className="page-inactive">Reset Password link has been sent.</p>
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
            </div>
            <form action ="">
                <div className ="padding">
                    <img src = {key} alt=""/><br/>
                    <span className="forgot"> Forgot Password? </span> 
                </div>
                <div className="subheading">
                    Enter your email to receive reset instructions
                </div>
                <div className="forgot-pass">
                    <label>Email</label> <br/>
                    <input type = "email" placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <button className="submit-btn" onClick={submit}> Submit Email</button>
                <div className="return">
                    <button onClick={handleClick}><img src = {arrow} alt="arrow key"/><span>Back to Log In</span></button>
                    </div>
                <div className="footer">
                    <span>Collabera Digital 2023</span>
                </div>
            </form>
            </div>    
    )
}