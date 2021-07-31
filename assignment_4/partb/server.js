const express    = require('express');
const bluebird = require('bluebird');
const s3Obj = require('./awsConfig');
const path = require('path');
const fs = require('fs');
const app	= express();

const PORT = process.env.PORT || 8000;

const uplaodtos3 = file => new bluebird((resolve, reject) => {
    
    
    const uploadParams = {Bucket: 'source-data-b00883311', Key: '', Body: ''};
    const fileStream = fs.createReadStream(file);
    const s3 = s3Obj.getS3Obj();
    fileStream.on('error', function(err) {
        return reject(`File Error ${err}`);
    });
    
    
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file.replace('./Train/', ''));
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            return reject(`Error ${err}`);
        } if (data) {
            console.log(data.Location);
            setTimeout(() => resolve(`Upload Success: ${data.Location}`), 5000)
        }
    });
})

app.get('/', (req, res) => {
    
    
    let filename = [];
    fs.readdirSync('./Train').forEach(file => {
        filename.push(`./Train/${file}`);
    });
    bluebird.mapSeries(filename, file => uplaodtos3(file))
        .then(data => {
            console.log(data);
            return res.send(data);
        }).catch(err => {
            console.log(err);
            return res.send(err);
        });
});

const appStart = () => new bluebird((res) => {
	app.listen(PORT, () => {
		return res();
	});
});

s3Obj.setS3Obj()
	.then(console.log('s3 connection workign'))
	.then(appStart)
	.then(console.log('server is started sucessfully'))
	.catch(e => console.log(e));
