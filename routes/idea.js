const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//회원가입
router.post('/create', async (req,res)=>{
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
    return res.status(201).send({})
})

router.post('/update', async (req,res)=>{
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
        VALUES($1, $2, $3, $4, NOW(), $5, $6, $7)
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
    return res.status(201).send({})
})


module.exports = router