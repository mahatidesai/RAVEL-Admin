import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    function validateAuth(e) {
        e.preventDefault(); // Prevent form submission from reloading the page
        const email = document.getElementById("emailinput").value;
        const password = document.getElementById("passwordinput").value;
        console.log(email, password);

       
        if (email === "admin@gmail.com" && password === "admin") {
            navigate('/homepage'); 
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="login-page">
            <div className="admin-login">
                ADMIN LOGIN
            </div>
            <div>
                <form className="login-form" onSubmit={validateAuth}>
                    {/* email */}
                    <div id="email">Email:<br/>
                        <input id="emailinput" type="email" required />
                    </div>

                    {/* password */}
                    <div id="password">Password:<br/>
                        <input id="passwordinput" type="password" required /><br/>
                    </div>

                    <button type="submit" className="login-button">LOG IN</button>
                </form>
            </div>
        </div>
    );
}
