const express = require("express")
const router = express.Router()
const path = require("path")
const postgresql = require('../lib/postgresql')

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../views/data.html"));
})

router.get('/users', async (req,res)=>{
    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM users
        `
    )

    await pg.disconnect()
    let data = {result : result.rows};
    return res.status(200).json(data)
})

router.get('/user_activities', async (req,res)=>{
    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM user_activities
        `
    )

    await pg.disconnect()
    let data = {result : result.rows};
    return res.status(200).json(data)
})

router.get('/ideas', async (req,res)=>{
    const pg = new postgresql()
    await pg.connect()

    const result = await pg.client.query(
        `
        SELECT * FROM ideas
        `
    )

    await pg.disconnect()
    let data = {result : result.rows};
    return res.status(200).json(data)
})

router.get('/truncate', async (req,res)=>{
    const pg = new postgresql()
    await pg.connect()

    await pg.client.query(
        `
        TRUNCATE users, user_activities, ideas RESTART IDENTITY;
        `
    )

    await pg.disconnect()
    return res.status(302).redirect('/data')
})

module.exports = router