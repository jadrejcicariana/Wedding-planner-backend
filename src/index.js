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


app.get('/:username', async (req, res) => {
    let username = req.params.username
    let db = await connect()

    let cursor = await db.collection("users").find({username: username})
    cursor.stream().on("data", doc => res.json(doc));

    console.log("test details")
})

app.listen(port, () => console.log(`listening on port ${port}`))