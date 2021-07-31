const AWS = require('aws-sdk');
const BlueBirdPromise = require('bluebird');

let s3;

const setS3Obj = () => new BlueBirdPromise((res) => {
    AWS.config.update({
    accessKeyId: "ASIA3TAPEDRZAPNXAP7N",
    secretAccessKey: "yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI",
    sessionToken: "FwoGZXIvYXdzELv//////////wEaDOUIRai5ESbyL0orKyK/Aa8Xb3caHzEAnn4DgQotKAM3dPLm/s2Bq7CJX/EL2Uc6G9fQ7OG57R88OVT2zaV7idQTjh7HvLUR1dh+kkhSdt3X8zZgcpCnkccwwIf7vX7bXxhjhAG65BpSU6HnQIjE40wAXMPqdMccNEe3wgtQoYN+x6PziUsipYo6lrRRgWK+fWW3eYP3AiaxlFmyTlhGY0h9CV02kBGT56htV0jJ4dn+a6VB7ntBfNoyYRDYEgnxIe1ayhCMK+sFC7/jxRSPKIfVkogGMi1PSzxTCGQPlfaIyf9yajh6f5qb3gmmL3ke14z5Cl6jYoxxiaSxQBdEhhYJqLw=",
    region: "us-east-1"

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
