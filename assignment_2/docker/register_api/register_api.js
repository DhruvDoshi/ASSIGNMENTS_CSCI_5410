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
    res.send('This is registeration container')
})

app.post('/addnew',(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    const user = {
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        Contact: req.body.contact,    
    }

    registerUser(user,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Error occured"
            });
        }else{
            res.send(data);
        }
    })

})

registerUser = (newUser,result)=>{
    sql.query("INSERT INTO userinformation SET ?",newUser, (err,res)=>{
        if(err){
            result(err,null);
            return;
        }

        result(null,{id:res.insertId, ...newUser})
    })
}
  
app.listen(port, () => {
    console.log(`server on http://localhost:${port}`)
})