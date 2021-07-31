const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const sw = require('stopword')
const { distance } = require('fastest-levenshtein')

AWS.config.update({
    region: "us-east-1",
    String ACCESS_KEY="ASIA3TAPEDRZAPNXAP7N";
    String SECRET_KEY="yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI";
    String ACCESS_TOKEN="FwoGZXIvYXdzELv//////////wEaDGnBYbIhkPx8fo63HiK/AUwCBM1jSY7H31GWy0TVm4u9w35BUHsXHh0ouViM4WL3CBMIWMYa3tkXMmJjHYBij9v2AD1WPzf47Fq8Qyv/6eIN6BppzCxigva2j5erKZ5DrPcvEhLb1NfciwqKSbfLv0yhY6HNqfcJatB2Th9EDgAEPGHOZHhrfbXJsT8WaVtZx0w5I9BIAZxA36Gtktu9gGfQ8M8i7xqLcoxQTli5Hk0gGA8YLOkXi4IIlYjDCw/KpEmHjpWDkaOyuTAx+3BwKPnQkogGMi2+XSFnSGKbWzPsgP+cw6v3Ts2TM3pNvBKE8LnSB8zLv31/N2YXrmJKCRgCt9Y=";

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
