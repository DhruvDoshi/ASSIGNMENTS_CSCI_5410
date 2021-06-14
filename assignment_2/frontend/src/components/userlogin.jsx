import React, { useState } from 'react';
import { Redirect } from 'react-router';
import UserService from "../services/user.service";



const Login = () => {

    const [logindet,userdetails] = useState("");

    function changehandle(e){
        let attribute = e.target.name;
        let value = e.target.value;
        userdetails({...logindet, [attribute] : value.trim()});
    }

    function putloginreq(){
        UserService.authenticateuser(logindet).then(() => {
            window.location.reload();
        });
    }
    

    return ( <form>
        <br />
        <br />
        <br />
        <div className = "text-nowrap" id="email">
            <style>{}css</style>
            <label htmlFor="exampleInputEmail1" className="form-label" style={{color: "purple"}}>Email address</label>
            <input type="text" className="form-control" name="email" placeholder="Enter Mail Here" onChange={changehandle}/>
            <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>  
        </div>
        <br />
        <br />
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{color: "purple"}}>Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter Password Here" onChange={changehandle}/>
            <small id="passwordHelpBlock" className="form-text">
                Suggested password is 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </small>
        </div>
        <br />
        <br />
        <button type="button" onClick={putloginreq} className="btn btn-primary" style={{display: "flex"}}>Submit</button>

    </form> );
}
 
export default Login;