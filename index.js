const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

// amirhossainbc75
// sHiKJoo3fAljOTPP

// midewaare
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3yb9d5d.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const furnitureCollection=client.db('productDB').collection('furnitures')

    const profileCollection = client.db("productDB").collection("profileInfo");

    // user collection
    const usercollection = client.db("productDB").collection("user");

 
    // adding furnitures
    app.post("/furnitures", async (req, res) => {
      const furnitures = req.body;
      // console.log('get product',product)
      const result = await furnitureCollection.insertOne(furnitures);
      res.send(result);
    });

       //user related api post
       app.post("/userCart", async (req, res) => {
        const user = req.body;
        const result = await usercollection.insertOne(user);
        res.send(result);
      });
    // gettion furnitures
    app.get("/furnitures", async (req, res) => {
      const cursor = furnitureCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
  





   


 
 
    //usercart related api post
    app.post("/userCart", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

// userwise get 
    app.get("/userCart/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = usercollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //  usercart delete
    app.delete("/userCart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usercollection.deleteOne(query);
      res.send(result);
    });

 







    //user profile related api post
    app.post("/profileInfo", async (req, res) => {
      const profileInfo = req.body;
      const result = await profileCollection.insertOne(profileInfo);
      res.send(result);
    });


    //getting all profile info
    app.get("/profileInfo", async (req, res) => {
      const cursor = profileCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});
