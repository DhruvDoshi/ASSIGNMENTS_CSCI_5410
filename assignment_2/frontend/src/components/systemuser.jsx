import React, { useEffect, useState } from 'react';
import UserService from '../services/user.service';

const Systemuser = () => {

    let [userstate, setUserState] = useState([]);

    useEffect(() => {
       UserService.displayusers().then((response)=>{
           console.log(response.data);
           setUserState(response.data);
       })
    },[]);

    return (
    <div>
        <br />
        <br />
        <p>This tab will show the user details along with status. <br />
            For the users who are using the application status is ONLINE.
        </p>
        <table className="table" style={{width:"50%"}}>
            <thead>
                <tr style={{background: "#6C5B7B"}}>
                    <th scope="col" style={{color: "#F1FAEE"}}>UserId</th>
                    <th scope="col" style={{color: "#F1FAEE"}}>Status</th>
                    <th scope="col" style={{color: "#F1FAEE"}}>Name</th>
                    <th scope="col" style={{color: "#F1FAEE"}}>Email</th>
                    <th scope="col" style={{color: "#F1FAEE"}}>Contact</th>
                </tr>
            </thead>
            <tbody>
                { userstate.map((eachrow => 
                    <tr>
                        <td style={{background: "#FE4365"}}>{eachrow.Id}</td>
                        <td style={{background: "#FC9D9A"}}>{eachrow.State}</td>
                        <td style={{background: "#F9CDAD"}}>{eachrow.Name}</td>
                        <td style={{background: "#C8C8A9"}}>{eachrow.Email}</td>
                        <td style={{background: "#83AF9B"}}>{eachrow.Contact}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>);
}

export default Systemuser;