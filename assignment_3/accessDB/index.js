console.log('Starting accessDb lambda trigger');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

/* 
    “AWS Lambda function handler in Node.js - AWS Lambda,” Amazon.com, 2021. [Online]. 
    Available: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html. [Accessed: 30-Jun-2021]
**/
exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const buc_parameters = {
        Bucket: bucket,
        Key: key,
    };
    var fdata
    s3.getObject(buc_parameters, function (err, metadata) {
        if (err && err.code === 'NotFound') {
            console.log("The object on which we are working is missing")
        } else {
            fdata = metadata.Body.toString('utf-8');
        }
    })
    accessDB(fdata, buc_parameters.Key)
};


const accessDB = async (arrayodstrings, k1) => {
    var pool = mysql.createPool({
        host: "ass3.cjw8moe24ubd.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "dhruv25071999",
        port: "3306",
        database: "ass3"
    });


    console.log(arrayodstrings[k1]);
    for (var a = 0; a < arrayodstrings[k1].length; a++) {
        for (var key in arrayodstrings[k1][a]) {
            await addtoDB(key, pool);
        }
    }
pool.end();
}


function addtoDB(key, pool) {
    return new Promise(function (resolve) {
        var ch = "SELECT * FROM information where string= '" + key + "'";
        pool.query(ch, function (err, result) {
            if (result.length < 1) {
                var ins = "INSERT INTO information (string,code) VALUES ('" + key + "',1)";
                pool.query(ins, function (err, result) {
                    if (err) {
                        console.log(err);
                        }
                    resolve("Inserted completely");
                })
            } else {
                var up = "UPDATE information SET code = code + 1 WHERE string ='" + key + "'";
                pool.query(up, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    resolve("updatation completed");
                })
            }
        })
    })
}
