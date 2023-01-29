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

router.get('/get/:id', async (req,res)=>{
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

// {user_id: 1, 
//     title: 제목, 
//     overview: ㅇㅇㅇㅇㅇㅇㅇㅇㅇ요약요약, 
//     description: 
//     "{"content":
//     [{"type":"text","content":"설명…"},
//     {"type":"text","content":"ㅜㅐㅗㅔㅐㅔㅐㅔ"},
//     {"type":"image","content":"https://e7.pngegg.com/pngimages/739/17/png-clipart-product-design-rectangle-gray-walls-angle-rectangle.png"},
//     {"type":"text","content":"3674382647289"},
//     {"type":"image","content":"https://e7.pngegg.com/pngimages/739/17/png-clipart-product-design-rectangle-gray-walls-angle-rectangle.png"},
//     {"type":"image","content":"https://e7.pngegg.com/pngimages/739/17/png-clipart-product-design-rectangle-gray-walls-angle-rectangle.png"},
//     {"type":"text","content":"ㄴㅇㄴㅁㅇㅁㄴㅇㄴㅁㄷㅂ33ㄷㅂㅈ"}],
//     "hashTags":[]}", 
//     price: 4321, 
//     category: 1, 
//     thumbnail: "https://e7.pngegg.com/pngimages/739/17/png-clipart-product-design-rectangle-gray-walls-angle-rectangle.png", 
//     is_commercial_available: false, 
//     is_patent_available: false
// }