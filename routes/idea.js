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


    const pg = new postgresql()
    await pg.connect()

    // const result = await pg.client.query(
    //     `
    //     SELECT FROM users
    //     WHERE index=$1
    //     RETURNING index
    //     `
    // ,[data.user_id])

    // if(result.rowCount == 0) return res.status(400).send({'errmsg':'계정이 존재하지 않음'})

    await pg.client.query(
        `
        INSERT INTO ideas(user_id, title, overview, description, created, price)
        VALUES($1, $2, $3, $4, NOW(), $5)
        `
    ,[data.user_id, data.title, data.overview, data.description, data.price])

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