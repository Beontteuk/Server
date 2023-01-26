const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

router.get('/', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM reviews
        `
    )

    await pg.disconnect()

    returndata.message = '리뷰 목록 불러오기 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata)
})

router.post('/create', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //customer_id
    //idea_id

    //title
    //description
    //rate
    

    

    const pg = new postgresql()
    await pg.connect()

    //리뷰 테이블에 리뷰 추가
    await pg.client.query(
        `
        INSERT INTO reviews(customer_id, idea_id, title, description, rate, created)
        VALUES($1, $2, $3, $4, $5, NOW())
        `
    ,[data.customer_id, data.idea_id, data.title, data.description, data.rate])
    //아이디어 테이블에 별점 추가, 별점 카운트 1 증가, 별점 계산
    await pg.client.query(
        `
        UPDATE ideas
        SET rating_cnt = rating_cnt + 1, rating_sum = rating_sum + $1

        WHERE index = $2
        `
    ,[data.rate, data.idea_id])

    await pg.client.query(
        `
        UPDATE ideas
        SET rating = ROUND(rating_sum::decimal / rating_cnt::decimal, 2)

        WHERE index = $1
        `
    ,[data.idea_id])

    await pg.disconnect()

    returndata.message = "리뷰 작성 성공"
    return res.status(201).json(returndata)
})

module.exports = router