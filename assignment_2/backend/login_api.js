const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8001;
const sql = require("./db");    
const cors = require('cors');

app.use(cors({origin:'http://localhost:3000'}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Login/Logout containerr')
})

app.post('/authenticateuser',(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Empty content not allowed"
        })
    }

    console.log("my request",req.body);
    const userCredentials = {
        Email: req.body.email,
        Password: req.body.password    
    }

    registerUser(userCredentials,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "user creation failed"
            });
        }else{
            res.send(data);
        }
    })

})

app.post('/exituser',(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Empty content not allowed"
        })
    }

    console.log("my request",req.body.id);
    const loginId = {
        id: req.body.id
    }

    logoutUser(loginId,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "user logout failed"
            });
        }else{
            res.send(data);
        }
    })

})

registerUser = (newUser,result)=>{
    
    const loginquery = "SELECT * FROM userinformation WHERE Password='"+newUser.Password+"' && Email='"+newUser.Email+"'";
    

    sql.query(loginquery,(err,res)=>{
        if(err){
            result(err,null);
            return;
        }else{
            loginid = res[0].Id;
            updatequery = "UPDATE userstate SET State='online' WHERE UserId="+loginid+"";
            sql.query(updatequery, loginid ,(erro,resu)=>{
                if(erro){
                    result(erro,null)
                    return;
                }else{
                    result(null,{id:loginid})
                }
            });  
        }
    });
}



logoutUser = (newUser,result)=>{

    const logoutquery = "UPDATE userstate SET State='offline' WHERE UserId="+newUser.id+"";
    
    sql.query(logoutquery,(err,res)=>{
        if(err){
            result(err,null)
            return;
        }else{
            logoutquery
            result(null,{id:newUser.id})
        }
    });
}


app.listen(port, () => {
    console.log(`server on http://localhost:${port}`)
})