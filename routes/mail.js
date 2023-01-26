const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//쪽지 신규작성
router.post('/send', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //from_id
    //to_id
    //description

    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        INSERT INTO mails(from_id, to_id, description, sended)
        VALUES($1, $2, $3, NOW())
        `
    ,[data.from_id, data.to_id, data.description])

    await pg.disconnect()

    returndata.message = "쪽지 전송 성공"
    return res.status(201).json(returndata)
})

router.get('/:id', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const id = req.params.id;

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM mails
        WHERE from_id=$1 or to_id=$1
        ORDER BY sended
        `
    ,[id])

    await pg.disconnect()

    returndata.message = "쪽지 조회 성공"
    returndata.result = result.rows
    return res.status(200).json(returndata)
})


module.exports = router