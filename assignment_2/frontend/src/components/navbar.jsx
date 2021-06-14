import React, { useEffect, useState } from 'react';
import UserService from "../services/user.service";

const Navbar = () => {

    const [showloggedin, serlog] = useState(false);

    useEffect(() =>{
        if(localStorage.getItem("userID")){
            serlog(true);
        }
    })

    function outputhan() {
        const loginDetails = { id: localStorage.getItem("userID")}
        UserService.exituser(loginDetails).then(() => {
            console.log(localStorage.getItem("userID"));
        });
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-dark" id="home-navbar">
        <a className="navbar-brand" style={{color: "white"}} href="/#">Serverless Assignment</a>
        <button className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" >
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            <ul className="navbar-nav" >
                { !showloggedin && 
                    <li>
                        <a className="nav-item nav-link" style={{color: "white"}} href="/userlogin">Login</a>
                    </li>
                }
                    <li>
                        <a className="nav-item nav-link" style={{color: "white"}} href="/userregister">Register</a>
                    </li>
                { showloggedin && (
                <li>
                    <a className="nav-item nav-link" style={{color: "white"}} href="/systemuser">Users</a>
                </li>)
                }
                { showloggedin && (
                <li>
                    <a className="nav-item nav-link" style={{color: "white"}} href="/userlogin" onClick={outputhan}>Logout</a>
                </li>)
                }
            </ul>
        </div>
    </nav> 
    );
}
 
export default Navbar;