const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//특정 유저의 정보 불러오기

router.get('/:id', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const id = req.params.id;

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM users
        WHERE index=$1;
        `
    ,[id])

    await pg.disconnect()
    returndata.message = '회원정보 불러오기 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata);
})


router.get('/profile/:id', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const id = req.params.id;
    
    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM users
        LEFT JOIN (SELECT index, point, idea_cnt, collection_cnt FROM user_activities) AS code
        USING (index)
        WHERE index=$1;
        `
    , [id])

    await pg.disconnect()
    returndata.message = '회원 상세정보 불러오기 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata);
})


module.exports = router