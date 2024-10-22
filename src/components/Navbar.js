import React from 'react';
import logoutImage from '../images/Logout.png';

export default function Navbar(){
    return(
        <>
        <nav className="navbar">
            <div id="admintxt"><a href="/homepage">ADMIN</a></div>
            <div className="logout">
                <img src={logoutImage} id="logoutimg" alt='->'/>
                <a href="/"><div id="logouttxt">LOGOUT</div></a>
            </div>
        </nav>
        </>

    );
}