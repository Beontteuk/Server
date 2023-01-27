
//const awssdk = require("aws-sdk")
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: 'AKIA4I52XCBNMHK3JNUZ',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
  signatureVersion: "v4",
});

const s3 = new AWS.S3();
const myBucket = 'inmat';
const signedUrlExpireSeconds = 60 * 5;

function createUrl(fileName) {
  const url = s3.getSignedUrl("putObject", {
    Bucket: myBucket,
    Key: fileName,
    Expires: signedUrlExpireSeconds,
    ContentType: "image/*",
  });
  return url;
}

console.log(createUrl('everytime-1672503845094.jpg'));