const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//특정 유저의 정보 불러오기
router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    
    const pg = new postgresql()
    await pg.connect()


    await pg.client.query(
        `
        SELECT nickname, point, idea_cnt, collection_cnt FROM user_activities
        WHERE
        `
    ,[data.user_id, data.idea_id])

    await pg.disconnect()
    return res.status(201).send({})
})


module.exports = router