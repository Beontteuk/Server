var aws = require('aws-sdk');
var fs = require('fs');
require('dotenv').config({path: __dirname + '\\' + '.env'});
 
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region : 'us-east-1'
});
 
var param = {
    'Bucket':'flapper-storagy',
    'Key': 'image/' + 'logo',
    'ACL':'public-read',
    'Body':fs.createReadStream('94.png'),
    'ContentType':'image/png'
}
 
s3.upload(param, function(err, data){
    if(err) {
        console.log(err);
    }
    console.log(data);
});