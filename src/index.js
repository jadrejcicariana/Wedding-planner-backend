import express from 'express'
import cors from 'cors'
import connect from './db.js'

const app = express()
const port = 3000

app.use(cors())

app.get('/', async (req, res) => {
    let db = await connect()

    let cursor = await db.collection("weddingdetails").find()
    let results = await cursor.toArray()

    console.log("test")

    res.json(results)
})

app.listen(port, () => console.log(`listening on port ${port}`))