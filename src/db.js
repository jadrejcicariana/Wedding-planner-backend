import mongo from "mongodb"
import { MongoClient } from "mongodb";



let connection_string = "mongodb+srv://admin:admin@cluster0.ooabnxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client = new MongoClient(connection_string)

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