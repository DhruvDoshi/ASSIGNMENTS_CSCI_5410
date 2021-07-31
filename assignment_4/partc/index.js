var AWS = require('aws-sdk');
var fs = require('fs');

s3 = new AWS.S3({
    profile: "default",
    accessKeyId: "ASIA3TAPEDRZAPNXAP7N",
    secretAccessKey: "yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI",
    sessionToken: "FwoGZXIvYXdzELv//////////wEaDOUIRai5ESbyL0orKyK/Aa8Xb3caHzEAnn4DgQotKAM3dPLm/s2Bq7CJX/EL2Uc6G9fQ7OG57R88OVT2zaV7idQTjh7HvLUR1dh+kkhSdt3X8zZgcpCnkccwwIf7vX7bXxhjhAG65BpSU6HnQIjE40wAXMPqdMccNEe3wgtQoYN+x6PziUsipYo6lrRRgWK+fWW3eYP3AiaxlFmyTlhGY0h9CV02kBGT56htV0jJ4dn+a6VB7ntBfNoyYRDYEgnxIe1ayhCMK+sFC7/jxRSPKIfVkogGMi1PSzxTCGQPlfaIyf9yajh6f5qb3gmmL3ke14z5Cl6jYoxxiaSxQBdEhhYJqLw=",
    region: "us-east-1"
});

comprehend = new AWS.Comprehend({
    profile: "default",
    accessKeyId: "ASIA3TAPEDRZAPNXAP7N",
    secretAccessKey: "yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI",
    sessionToken: "FwoGZXIvYXdzELv//////////wEaDGnBYbIhkPx8fo63HiK/AUwCBM1jSY7H31GWy0TVm4u9w35BUHsXHh0ouViM4WL3CBMIWMYa3tkXMmJjHYBij9v2AD1WPzf47Fq8Qyv/6eIN6BppzCxigva2j5erKZ5DrPcvEhLb1NfciwqKSbfLv0yhY6HNqfcJatB2Th9EDgAEPGHOZHhrfbXJsT8WaVtZx0w5I9BIAZxA36Gtktu9gGfQ8M8i7xqLcoxQTli5Hk0gGA8YLOkXi4IIlYjDCw/KpEmHjpWDkaOyuTAx+3BwKPnQkogGMi2+XSFnSGKbWzPsgP+cw6v3Ts2TM3pNvBKE8LnSB8zLv31/N2YXrmJKCRgCt9Y=",
    region: "us-east-1"
});

const params = {
    Bucket: 'tweetdatab00883311',
    Key: '00'
};

file_name = "file_,ongo_tweets.txt";

s3.getObject(params, function (err, metadata) {
    if (err && err.code === 'NotFound') {
        console.log(params);
        console.log("the object is not found");
    } else {
        console.log(params);
        let filedata = metadata.Body.toString('utf-8');
        const arr = filedata.split("\n");
    console.log(arr);
    for(let i=0;i<arr.length;i++){
        var params = {
            LanguageCode:'en',
            Text: arr[i]
        }
        if(arr[i]==''){
            continue;
        }else{
            sentimentdetector(params);
        }
        }
    }
    
});

function sentimentdetector(params){
    comprehend.detectSentiment(params,function(err,data){
        if(err){
            console.log(err,err.stack);
        }else{
            console.log(data)
        }
    })
}