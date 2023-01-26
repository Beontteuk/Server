const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//아이디어 신규작성
router.post('/create', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //user_id
    //title
    //overview
    //description
    //price

    //category
    //thumbnail

    //is_commercial_available
    //is_patent_available

    

    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        INSERT INTO ideas(user_id, title, overview, description, created, price, category, thumbnail, is_commercial_available, is_patent_available)
        VALUES($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9)
        `
    ,[data.user_id, data.title, data.overview, data.description, data.price, data.category, data.thumbnail, true, true])

    await pg.client.query(
        `
        UPDATE user_activities
        SET idea_cnt = idea_cnt + 1
        WHERE user_id = $1
        `
    ,[data.user_id])

    await pg.disconnect()

    returndata.message = "작성 성공"
    return res.status(201).json(returndata)
})

//아이디어 수정
router.post('/update', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;

    //idea_id
    
    //user_id
    //title
    //overview
    //description
    //price

    //category
    //thumbnail

    //is_commercial_available
    //is_patent_available

    

    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        UPDATE ideas
        SET user_id=$1, title=$2, overview=$3, description=$4, price=$5, category=$6, thumbnail=$7, is_commercial_available=$8, is_patent_available=$9
        WHERE user_id = $1
        `
    ,[data.user_id, data.title, data.overview, data.description, data.price, data.category, data.thumbnail, true, true])

    await pg.disconnect()

    returndata.message = "수정 성공"
    return res.status(200).json(returndata)
})


module.exports = router