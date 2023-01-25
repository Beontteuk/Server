const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//회원가입
router.post('/add', async (req,res)=>{
    const data = req.body;
    
    //user_id
    //idea_id

    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        INSERT INTO collections(user_id, idea_id)
        VALUES($1, $2)
        `
    ,[data.user_id, data.idea_id])

    await pg.disconnect()
    return res.status(201).send({})
})


module.exports = router