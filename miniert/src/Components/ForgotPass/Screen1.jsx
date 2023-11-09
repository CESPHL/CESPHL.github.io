import React from "react";
import './main.css';

export default function Screen1(){
    return(
        <div>
            <form action ="">
                <h2> Forgot Password? </h2>
                <div className="subheading">Enter your email to receive reset instructions</div>
                <div className="forgot-pass">
                    <label>Email</label>
                    <input type = "email" placeholder='Enter email'/>
                </div>
                <div className="return">Back to Log In</div>
            </form>
        </div>
    )
}