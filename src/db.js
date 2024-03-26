import mongo from "mongodb"
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

let client = new MongoClient(process.env.CONNECTION_STRING)

let db = null

export default () => {
    return new Promise((resolve, reject) => {

        if (db && client.isConnected) {
            resolve(db)
        }

        console.log("connecting")
        client.connect().then(() => {
            console.log("connection successful");
            db = client.db("weddingplanner")
            resolve(db)
        }
        ).catch(err => {
            console.log("connection error: ", err);
            reject("error")
        })
    })
}