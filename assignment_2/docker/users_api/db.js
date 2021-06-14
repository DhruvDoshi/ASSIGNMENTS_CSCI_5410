const mysql = require("mysql")

const dbConfig = {
    HOST : "34.122.57.193",
    USER : "root",
    PASSWORD : "",
    DB : "a2_5410",
    insecureAuth : true
};

const connection = mysql.createConnection({
    // socketPath: '/cloudsql/a2_5410:us-central1:csci5410-a2',
    socketPath: '/cloudsql/lustrous-bounty-313514:us-central1:csci5410-a2',
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
