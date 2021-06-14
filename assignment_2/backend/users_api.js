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
    res.send('Hello.... This is your Users Container')
})

app.get('/displayusers',(req,res)=>{
    viewAllusers((err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "some error occured while logging out the user"
            });
        }else{
            res.send(data);
        }
    })
})

viewAllusers = (result)=>{
    userquery = "SELECT ui.*, us.State FROM userinformation AS ui JOIN userstate AS us WHERE ui.Id = us.UserId;";
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
    console.log(`Server Started and listening on http://localhost:${port}`)
})