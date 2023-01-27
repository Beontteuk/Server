const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//회원가입
router.post('/signup', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const data = req.body;
    
    //name
    //email
    //password
    //password_check
    //nickname

    if(data.password != data.password_check) {
        returndata.message = '비밀번호 확인 실패'
        return res.status(400).send(returndata)
    }

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        INSERT INTO users(email, password, nickname, created)
        VALUES($1, $2, $3, NOW())
        RETURNING index, nickname
        `
    ,[data.email, data.password, data.nickname])

    console.log(result.rows[0]);
    //{ index : 2, nickname : jun}

    await pg.client.query(
        `
        INSERT INTO user_activities(user_id)
        VALUES($1)
        `
    ,[result.rows[0].index])

    await pg.disconnect()

    returndata.message = '회원가입 성공'
    return res.status(201).json(returndata)
})

//로그인
router.post('/signin', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //email
    //password

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT index, password FROM users
        WHERE email=$1
        `
    ,[data.email])
    
    await pg.disconnect()

    
    

    if(result.rowCount == 0) {
        returndata.message = '계정이 존재하지 않음'
        return res.status(400).json(returndata)
    }

    else if(result.rows[0].password != data.password) {
        returndata.message = '비밀번호 틀림'
        return res.status(400).json(returndata)
    }
    else {
        returndata.message = '로그인 성공'
        returndata.result = {"user_id": result.rows[0].index}               
        return res.status(200).json(returndata)
    }

})

// 이메일 중복 확인
router.post('/check-duplication-email', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const email = req.body.email

    const pg = new postgresql()
    await pg.connect()
    const result = await pg.client.query(
        `
        SELECT * FROM users
        WHERE email = $1;
        `
    ,[email])

    console.log(result.rows[0]);
    
    await pg.disconnect()

    if(result.rowCount > 0){
        returndata.message = '중복된 이메일입니다'
        returndata.result = {success: false}
        return res.status(400).json(returndata)
    }

    returndata.message = '사용 가능한 이메일입니다'
    returndata.result = {success: true}
    return res.status(200).send(returndata)
})

// 닉네임 중복 확인
router.post('/check-duplication-nickname', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const nickname = req.body.nickname

    const pg = new postgresql()
    await pg.connect()
    const result = await pg.client.query(
        `
        SELECT * FROM users
        WHERE nickname = $1;
        `
    ,[nickname])

    console.log(result.rows[0]);
    
    await pg.disconnect()

    if(result.rowCount > 0){
        returndata.message = '중복된 닉네임입니다'
        returndata.result = {success: false}
        return res.status(400).json(returndata)
    }

    returndata.message = '사용 가능한 닉네임입니다'
    returndata.result = {success: true}
    return res.status(200).send(returndata)
})


module.exports = router