const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

//아이디어 신규 구매
router.post('/', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //customer_id
    //idea_id
    

    const pg = new postgresql()
    await pg.connect()

    const price = await pg.client.query(
        `
        SELECT price FROM ideas
        WHERE index=$1
        `
    ,[data.idea_id])

    await pg.client.query(
        `
        UPDATE users SET point = point-$1
        `
    ,[price]
    )

    await pg.client.query(
        `
        INSERT INTO purchases(customer_id, idea_id)
        VALUES($1, $2)
        `
    ,[data.customer_id, data.idea_id])

    

    await pg.disconnect()

    returndata.message = "구매 성공"
    return res.status(201).json(returndata)
})

//아이디어 구매했는지 체크
router.post('/check', async (req,res)=>{
    let returndata = {"message":null, "result":{}}
    const data = req.body;
    
    //customer_id
    //idea_id
    

    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT index FROM purchases
        WHERE customer_id=$1 and idea_id=$2
        `
    ,[data.customer_id, data.idea_id])

    await pg.disconnect()
    
    if(result.rowCount > 0){
        returndata.message = "이미 구매한 아이디어입니다"
        returndata.result = {success: false}
        return res.status(400).json(returndata)
    }
    else{
        returndata.message = "아직 구매하지 않은 아이디어입니다"
        returndata.result = {success: true}
        return res.status(200).json(returndata)
    }

})




module.exports = router