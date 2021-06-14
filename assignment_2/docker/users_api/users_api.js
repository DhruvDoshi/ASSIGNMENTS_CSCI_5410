const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8002;
const sql = require("./db");    
const cors = require('cors');

app.use(cors({origin:'http://localhost:3000'}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('User container')
})

app.get('/displayusers',(req,res)=>{
    viewAllusers((err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "error while login user out"
            });
        }else{
            res.send(data);
        }
    })
})

viewAllusers = (result)=>{
    userquery = "SELECT userinformation.*, userstate.State FROM userinformation JOIN userstate WHERE userinformation.Id = userstate.UserId;";
    sql.query(userquery,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
    })
}

app.listen(port, () => {
    console.log(`server on http://localhost:${port}`)
})