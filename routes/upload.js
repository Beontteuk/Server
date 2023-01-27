const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')
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

//쪽지 신규작성
router.get('/:filename', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    createUrl(file)
    returndata.message = "쪽지 전송 성공"
    return res.status(201).json(returndata)
})


module.exports = router