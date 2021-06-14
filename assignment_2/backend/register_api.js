const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8000;
const sql = require("./db");    
const cors = require('cors');

app.use(cors({origin:'http://localhost:3000'}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Hello.... This is your Register Container')
})

app.post('/addnew',(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    console.log("my request",req.body);
    const user = {
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        Contact: req.body.contact,    
    }

    registerUser(user,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "some error occured while creating the user"
            });
        }else{
            res.send(data);
        }
    })

})

registerUser = (newUser,result)=>{
    sql.query("INSERT INTO userinformation SET ?",newUser, (err,res)=>{
        if(err){
            console.log("error",err)
            result(err,null);
            return;
        }

        console.log("New User Created:",{id:res.insertId, ...newUser});
        result(null,{id:res.insertId, ...newUser})
    })
}
  
app.listen(port, () => {
    console.log(`Server Started and listening on http://localhost:${port}`)
})