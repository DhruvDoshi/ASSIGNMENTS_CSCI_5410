console.log('Starting the trigger for Extract feature lambda');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

/* 
    “AWS Lambda function handler in Node.js - AWS Lambda,” Amazon.com, 2021. [Online]. 
    Available: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html. [Accessed: 30-Jun-2021]
*/
exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const buc_parameters = {
        Bucket: bucket,
        Key: key,
    };
    console.log(buc_parameters)
    extractFeatures(buc_parameters);
};


const extractFeatures = (buc_parameters) => {
    var uploadParams = {
    Bucket: 'tagsb00883311',
    Key: '',
    Body: ''
    }
    var counter = '{ \n "' + buc_parameters.Key + 'ne" : [ ';
    s3.getObject(buc_parameters, function (err, metadata) {
        // Using === because we need to match objects strictly
        if (err && err.code === 'NotFound') {
            console.log("The object on which we are working is missing")
        } 
        else {
            var file_info = metadata.Body.toString('utf-8');
            // Split with each new line
            file_info = file_info.split("\n")
            for (var i = 0; i < file_info.length; i++) {
                // splitting by space to get each word
                var identical_word = file_info[i].split(' ');
                for (var k = 0; k < identical_word.length; k++) {
                    // when null continue
                    if (identical_word[k] === '') {
                        continue;
                    }
                    // change to null
                    identical_word[k] = identical_word[k].replace(/[^a-zA-Z ]/g, "");
                    // check for lower and upper case
                    if (identical_word[k].charAt(0) === identical_word[k].charAt(0).toUpperCase()) {
                        // when null continue
                        if (identical_word[k] === '') {
                            continue;
                        }
                        var format_string = "\n\t{ "
                        format_string = format_string + '"' + identical_word[k] + '" : 1} ,';
                        counter = counter + format_string;
                    }
                }
            }
            // removing last element 
            counter = counter.slice(0, -1);
            counter = counter + " \n]}";
            // as required in assignment
            var filename = buc_parameters.Key + "ne"
            uploadParams.Key = filename;
            uploadParams.Body = counter;
            s3.upload(uploadParams, function (s3Err, data) {
                if (s3Err) {
                    console.log(s3Err);
                }
                console.log(`The uploading of file is done sucessfully at ${data.Location}`)
            });
            console.log(counter);
            var countjsonarray = JSON.parse(counter);
        }
    })
}
