import React, { useState } from 'react';
import addnew from '../services/user.service';

const Userregister = () => {

    const [userDetails,detailsset] = useState("");

    function changeuser(e){
        let attribute = e.target.name;
        let value = e.target.value;
        detailsset({...userDetails, [attribute] : value.trim()});
    }

    function adduserindb(e){
        addnew.addnew(userDetails);
    }

    return ( <form>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputName" className="form-label" style={{color: "purple"}}>Enter Name</label>
                    <input type="text" className="form-control" name="name" onChange={changeuser} placeholder="First Name" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputEmail" className="form-label" style={{color: "purple"}}>Enter Email</label>
                    <input type="text" className="form-control" name="email" onChange={changeuser} placeholder="Email"/>
                    <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>  
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputContact" className="form-label" style={{color: "purple"}}>Enter Contact</label>
                    <input type="number" className="form-control" name="contact" onChange={changeuser} placeholder="ContactNumber " />
                    <small id="number" className="form-text">Enter withing 10 numbers.</small>  
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{color: "purple"}}>Password</label>
                    <input type="password" className="form-control" name="password" onChange={changeuser} placeholder="Password"/>
                    <small id="passwordHelpBlock" className="form-text">
                        Suggested password is 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                </div>
                <br />
                <button type="button" onClick={adduserindb} className="btn btn-primary" placeholder="Submit">Submit</button>
            </form>
        );
}
 
export default Userregister;