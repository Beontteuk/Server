const express = require("express")
const router = express.Router()
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: 'AKIA4I52XCBNMHK3JNUZ',
  secretAccessKey: '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',
  region: 'ap-northeast-1',
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
    const filename = req.params.filename;
    
    returndata.message = "이미지 사인 성공"
    returndata.result = createUrl(filename);
    return res.status(200).json(returndata)
})


module.exports = router