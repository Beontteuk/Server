const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//컬렉션에 추가
router.post('/add', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body
    
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

    await pg.client.query(
        `
        UPDATE ideas
        SET collection_cnt = collection_cnt + 1
        WHERE user_id = $1
        `
    ,[data.idea_id])

    await pg.disconnect()

    returndata.message = "컬렉션에 추가되었습니다"
    return res.status(201).json(returndata)
})

//컬렉션에서 삭제
router.post('/delete', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body
    
    //user_id
    //idea_id

    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        DELETE FROM collections
        WHERE user_id=$1 and idea_id=$2
        `
    ,[data.user_id, data.idea_id])

    await pg.disconnect()

    returndata.message = "컬렉션에서 삭제되었습니다"
    return res.status(201).json(returndata)
})

module.exports = router