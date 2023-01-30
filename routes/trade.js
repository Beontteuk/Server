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
        ORDER BY created
        `
    )
    //console.log(result.rows);

    await pg.disconnect()

    returndata.message = '아이디어 목록 불러오기 성공'
    returndata.result = result.rows;
    return res.status(200).json(returndata)
})

router.get('/bough_idea/:id', async (req,res)=>{
    const id = req.params.id;

    let returndata = {"message":null, "result":{}}

    const pg = new postgresql()
    await pg.connect()


    const result = await pg.client.query(
        `
        SELECT ideas.user_id, users.nickname, 
        ideas.title, ideas.overview, ideas.description, 
        ideas.created, ideas.price, ideas.category, ideas.thumbnail,
        ideas.is_commercial_available, ideas.is_patent_available,
        ideas.rating_sum, ideas.rating_cnt, ideas.rating
        FROM ideas, users
        WHERE ideas.user_id=users.index and ideas.index=$1
        `
    ,[id]
    )

    await pg.disconnect()

    returndata.message = '특정 아이디어 불러오기 성공'
    if(result.rows[0] != undefined) {
        returndata.result = result.rows[0];
    }
    
    console.log(returndata);
    return res.status(200).json(returndata)
})


module.exports = router