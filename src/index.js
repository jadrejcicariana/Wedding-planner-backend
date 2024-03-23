import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connect from './db.js'
import auth from './auth.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post("/users", async (req, res) => {

    let user = req.body;
    
    try {
        let id = await auth.registerUser(user) 
        res.json({id: id}) 
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

app.post("/auth", async (req, res) => {

    let user = req.body

    try {
        let result = await auth.authenticateUser(user.username, user.password)
        res.json(result)
    } catch (e) {
        res.status(403).json({error: e.message})
    }   
})

app.get("/tajna", [auth.verify], (req, res) => {

    res.json({message: 'Ovo je tajna ' + req.jwt.username})
})

// app.get('/', async (req, res) => {
//     let db = await connect()

//     let cursor = await db.collection("weddingdetails").find()
//     let results = await cursor.toArray()

//     console.log("test")

//     res.json(results)
// })

app.listen(port, () => console.log(`listening on port ${port}`))