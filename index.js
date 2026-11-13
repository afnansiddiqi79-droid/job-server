import { MongoClient } from 'mongodb';
import express from "express";
import cors from "cors";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

const client = new MongoClient(process.env.DB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectedClient=await connectToMongoDB();
const db=connectedClient.db("job-app");
const users=db.collection("user");
const jobs=db.collection("jobs");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users",async(req,res)=>{
    const cursor=users.find({});
    const result=await cursor.toArray();
    res.send(result);

})
app.listen(port, () => {
  console.log(`Job app listening on port ${port}`);
});
