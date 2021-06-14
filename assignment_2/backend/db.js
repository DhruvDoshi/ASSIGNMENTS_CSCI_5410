const mysql = require("mysql")

const dbConfig = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "Dhruv@2599",
    DB : "a2_5410",
    insecureAuth : true
};

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect(error => {
    if(error){
        console.log(error);
    }else{
        console.log("Successfully Connected to the Database")
    }    
});

module.exports = connection;
