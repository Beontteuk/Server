const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')


router.get('/', (req, res)=>{
    res.send('search')
})

//검색어로 검색
router.get('/:word', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const word = '%'+req.params.word+'%';

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM ideas
        WHERE
        title like $1 or 
        overview like $1 or
        description like $1
        ;
        `
    ,[word])

    await pg.disconnect()
    returndata.message = '검색어로 검색 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata);
})


//
router.get('/category/:category_id', async (req,res)=>{
    let returndata = {"message":null, "result":{}}

    const id = req.params.category_id;

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM ideas
        WHERE category=$1;
        `
    ,[id])

    await pg.disconnect()
    returndata.message = '카테고리로 검색 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata);
})

module.exports = router