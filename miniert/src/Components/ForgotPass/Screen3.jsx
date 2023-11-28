import React, { useEffect, useState } from "react";
import arrow from '../Assets/back_arrow.svg';
import main from '../Assets/Framemain.svg';
import person from '../Assets/person-inactive.svg';
import nvmail from '../Assets/navbar_email.svg';
import lock from '../Assets/Lock.svg';
import check from '../Assets/forget-pass check.svg';
import bubble from '../Assets/deets-active.svg';

import './screen3.css';

export default function Screen1() {
    // let token = "";
    const [token, setToken] = useState("");
    useEffect(() => {
        // Get the URL of the current page
        const url = window.location.href;
        console.log(url);

        // Split the token from the URL
        const textSplitter = url.split("https://cesphl-github-io-backend.vercel.app/reset-password/");
        console.log(textSplitter);

        // Get the token from the textSplitter array
        const extractedToken = textSplitter[1];
        console.log(extractedToken);
        setToken(extractedToken);
    }, []); // Empty dependency array to run this effect only once

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const isPasswordValid = () => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    }

    const isPasswordMatch = () => {
        if (password !== password2) {
            return false;
        }
        return true;
    }

    const handleClick = () => {
        window.location.href = "/";
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(token); // returns a blank string
        if (isPasswordValid() === true && isPasswordMatch() === true) {
            try {
                console.log(token);
                const response = await fetch(`/reset-password/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token, password })
                });
                if (response.ok) {
                    console.log("Password reset successfully.");
                    window.location.href = "/resetsuccess";
                }
                else {
                    console.log("There was a problem resetting your password.");
                }
            }
            catch (error) {
                console.error("Error submitting new password.", error);
            }
        }
        else {
            console.log("Check if the password meets the minimum criteria.");
        }
    };
    return (
        <div className="forgot-form">
            <div className="rectangle">
                <div className="title">
                    <div className="main">
                        <img src={main} alt="" /><span><b>Collabera Digital</b><br />External Resource Timesheet</span>
                    </div>
                    <div className="list">
                        <div className="item">
                            <div>
                                <img src={person} alt="" />
                                <div className="item1">
                                    <h5 className="page-inactive">Email confirmation </h5>
                                    <p className="page-inactive">Provide your email for resent instructions.</p>
                                </div>
                            </div>
                            <div>
                                <img src={nvmail} alt="" />
                                <div className="item2">
                                    <h5 className="page-inactive">Email Sent</h5>
                                    <p className="page-inactive">Reset Password link has been sent.</p>
                                </div>
                            </div>
                            <div>
                                <img src={bubble} alt="" />
                                <div className="item3">
                                    <h5 className="page-active">New Password Details</h5>
                                    <p className="page-active">Input your new password in the field.</p>
                                </div>
                            </div>
                            <div>
                                <img src={check} alt="" />
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
            <form action="">
                <div className="padding">
                    <img src={lock} alt=""/><br />
                    <span className="forgot"> Set new Password</span>
                </div>
                <div className="subheading">
                    Reset your password by inputting a new one. It must be different from <br />your
                    previously used passwords.
                </div>
                <div className="forgot-pass">
                    <label>New Password</label> <br />
                    <input type="password" placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" required /><br /><br />
                    <label>Confirm Password</label> <br />
                    <input type="password" placeholder='••••••••' value={password2} onChange={(e) => setPassword2(e.target.value)} name="password2" id="password2"required />
                </div>
                <div className="conditions">
                    <p>Must be at least 8 characters</p>
                    <p>Must contain one special character</p>
                </div>
                <button className="submit-btn" onClick={submit}>Reset Password</button>
                <div className="return">
                    <button onClick={handleClick}><img src={arrow} alt="arrow key" /><span>Back to Log In</span></button>
                </div>
            </form>
        </div>
    )
}