const AWS = require('aws-sdk');
const BlueBirdPromise = require('bluebird');

let s3;

const setS3Obj = () => new BlueBirdPromise((res) => {
    AWS.config.update({
        region: "us-east-1",
        String ACCESS_KEY="ASIA3TAPEDRZAPNXAP7N";
        String SECRET_KEY="yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI";
        String ACCESS_TOKEN="FwoGZXIvYXdzELv//////////wEaDGnBYbIhkPx8fo63HiK/AUwCBM1jSY7H31GWy0TVm4u9w35BUHsXHh0ouViM4WL3CBMIWMYa3tkXMmJjHYBij9v2AD1WPzf47Fq8Qyv/6eIN6BppzCxigva2j5erKZ5DrPcvEhLb1NfciwqKSbfLv0yhY6HNqfcJatB2Th9EDgAEPGHOZHhrfbXJsT8WaVtZx0w5I9BIAZxA36Gtktu9gGfQ8M8i7xqLcoxQTli5Hk0gGA8YLOkXi4IIlYjDCw/KpEmHjpWDkaOyuTAx+3BwKPnQkogGMi2+XSFnSGKbWzPsgP+cw6v3Ts2TM3pNvBKE8LnSB8zLv31/N2YXrmJKCRgCt9Y=";

    })

    s3 = new AWS.S3({
        region: 'us-east-1'
    });
    return res();
});

const gets3object = () => {
    return s3;
};

module.exports = {
    gets3object,
    gets3object
};
