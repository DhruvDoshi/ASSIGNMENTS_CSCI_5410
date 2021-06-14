import axios from 'axios';


const addnew=(userDetails)=>{
    axios.post("https://registerdoc-6dfxlghyhq-uc.a.run.app/addnew",userDetails)
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log(error);
    })
}

const authenticateuser= (loginCredentials)=>{
    return axios.post("https://logindoc-6dfxlghyhq-uc.a.run.app/authenticateuser",loginCredentials)
    .then((response)=>{
        if(response.data){
            localStorage.setItem("userID", JSON.stringify(response.data.id));
        }
        return response.data;
    },(error)=>{
        console.log(error);
    })
}

const exituser = (loginCredentials1)=>{
    return axios.post("https://logindoc-6dfxlghyhq-uc.a.run.app/exituser",loginCredentials1)
    .then((response)=>{
        if(response.data){
            localStorage.removeItem("userID");
        }
    },(error)=>{
        console.log(error);
    })
}

const displayusers = ()=>{
    return axios.get("https://userdoc-6dfxlghyhq-uc.a.run.app/displayusers");
}

export default {
    addnew,
    authenticateuser,
    exituser,
    displayusers
}