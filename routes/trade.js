const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

router.get('/', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM ideas
        `
    )
    //console.log(result.rows);

    await pg.disconnect()

    returndata.message = '아이디어 목록 불러오기 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata)
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id;

    let returndata = {"message":null, "result":{}}

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM ideas
        WHERE index=$1
        `
    ,[id]
    )

    await pg.disconnect()

    returndata.message = '특정 아이디어 불러오기 성공'
    returndata.result = result.rows[0];
    return res.status(200).json(returndata)
})


module.exports = router