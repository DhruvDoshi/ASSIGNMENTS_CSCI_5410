const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const sw = require('stopword')
const { distance } = require('fastest-levenshtein')

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "ASIA3TAPEDRZAPNXAP7N",
    secretAccessKey: "yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI",
    sessionToken: "FwoGZXIvYXdzELv//////////wEaDOUIRai5ESbyL0orKyK/Aa8Xb3caHzEAnn4DgQotKAM3dPLm/s2Bq7CJX/EL2Uc6G9fQ7OG57R88OVT2zaV7idQTjh7HvLUR1dh+kkhSdt3X8zZgcpCnkccwwIf7vX7bXxhjhAG65BpSU6HnQIjE40wAXMPqdMccNEe3wgtQoYN+x6PziUsipYo6lrRRgWK+fWW3eYP3AiaxlFmyTlhGY0h9CV02kBGT56htV0jJ4dn+a6VB7ntBfNoyYRDYEgnxIe1ayhCMK+sFC7/jxRSPKIfVkogGMi1PSzxTCGQPlfaIyf9yajh6f5qb3gmmL3ke14z5Cl6jYoxxiaSxQBdEhhYJqLw=",
    region: "us-east-1"

})
const s3 = new AWS.S3({
        region: 'us-east-1'
    })

exports.handler = (event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name; 
    const Key = event.Records[0].s3.object.key; 

    let bucker_otp;
    let key_otp;
    
    const fileNum = parseInt(Key.replace('.txt', ''))
    if (fileNum > 299) {
      bucker_otp = 'test-data-b00869486';
      key_otp = 'testVector.csv';
    } else {
      bucker_otp = 'train-data-b00869486';
      key_otp = 'trainVector.csv';
    }
    s3.getObject({ Bucket, Key }, (err, data) => {
      if (err) return callback(err, err.stack)
      else {
        data = data.Body.toString('utf-8')
        
        data = data.replace(/[^\w\s]/g, '')
        data = data.replace(/[\s+]/g, ' ').trim()
        data = data.replace(/[\t+]/g, ' ')
        data = data.replace(/[\n+]/g, ' ')

        data = data.toLowerCase().split(' ')
        
        data = sw.removeStopwords(data)

        let txt = ''

        for (let i=0; i<data.length-1; i++) {
            const word1 = data[i]
            const word2 = data[i+1]
            const ld = distance(word1, word2)
            txt = `${txt}\n${word1},${word2},${ld}`
        }
        s3.getObject({ Bucket: bucker_otp, Key: key_otp }, (err1, data1) => {
          if (err1) {
            data1 = txt
          }
          else {
            data1 = data1.Body.toString('utf-8')
            data1 = `${data1}\n${txt}`
          }
          fs.writeFile(`/tmp/${key_otp}`, data1, (err2) => {
            if(err2) return callback(err2);
            
            const uploadParams = {Bucket: bucker_otp, Key: '', Body: ''};
            const file_str = fs.createReadStream(`/tmp/${key_otp}`);
            file_str.on('error', function(err3) {
                return callback(`File Error ${err3}`);
            });
            uploadParams.Body = file_str;
            uploadParams.Key = path.basename(`/tmp/${key_otp}`.replace('./tmp/', ''));
            s3.upload(uploadParams, function (e, d) {
                if (e) {
                    return callback(`Error ${e}`);
                }
              return callback();
            });
          });
        })
      }
    })
}
