import { Request, Response, Router } from "express";
const { ObjectId } = require("mongodb");
// const formData = require("../../data/formData.json");
// const PLANT_TABLE = process.env.PLANT_TABLE;
const PLANT_TABLE = "plants_local";
if (!PLANT_TABLE) {
  throw new Error("PLANT_TABLE not set");
}
const MongoClient = require("mongodb").MongoClient;
const mongoConnStr =
  process.env.DB_URL ||
  "mongodb+srv://andimiya:Octopus12!@cluster0.t1mvpta.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongoConnStr, {
  useNewUrlParser: true,
});
let db: any;

const createConn = async () => {
  await client.connect();
  db = client.db(PLANT_TABLE);
};

const plantsRouter: any = Router();

// Get a list of 50 posts
plantsRouter.get("/", async (req: Request, res: Response) => {
  console.log(req, "req");
  await createConn();
  const collection = await db.collection(PLANT_TABLE);
  const results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// Get a single plant
plantsRouter.get("/:title", async (req: Request, res: Response) => {
  await createConn();
  const collection = await db.collection(PLANT_TABLE);
  const query = { title: req.params.title };
  const result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new plant to the collection
// plantsRouter.post("/", async (req: Request, res: Response) => {
//   await createConn();
//   const collection = await db.collection(PLANT_TABLE);
//   const objtoAdd = {
//     images: [],
//     watering: [],
//     fertilizing: [],
//   };
//   objtoAdd.title = req.body.title;
//   formData.fields.forEach((field) => {
//     if (req.body[field.name]) {
//       objtoAdd[field.name] = req.body[field.name];
//     }
//   });
//   const result = await collection.insertOne(objtoAdd);
//   if (!result) {
//     res.status(500).send("Server Error - Unable to add plant");
//   } else {
//     res.status(200).json(result);
//   }
// });

// // Update the plant fields
// plantsRouter.patch("/plant/:id", async (req, res) => {
//   await createConn();
//   const collection = await db.collection(PLANT_TABLE);
//   const query = { _id: ObjectId(req.params.id) };

//   let objForUpdateArrays = {};
//   let objForUpdateStrings = {};

//   formData.fields.forEach((field) => {
//     if (req.body[field.name]) {
//       objForUpdateStrings[field.name] = req.body[field.name];
//     }
//   });

//   formData.arrayFields.forEach((field) => {
//     if (req.body[field]) {
//       objForUpdateArrays[field] = req.body[field];
//     }
//   });

//   if (req.body.daysBetweenWatering === -1) {
//     await collection.updateOne(query, {
//       $set: { daysBetweenWatering: undefined },
//     });
//   } else {
//     objForUpdateStrings.daysBetweenWatering = req.body.daysBetweenWatering;
//   }

//   if (req.body.daysBetweenFertilizing === -1) {
//     await collection.updateOne(query, {
//       $set: { daysBetweenFertilizing: undefined },
//     });
//   } else {
//     objForUpdateStrings.daysBetweenFertilizing =
//       req.body.daysBetweenFertilizing;
//   }
//   const updates = await collection.updateMany(query, {
//     $push: objForUpdateArrays,
//     $set: objForUpdateStrings,
//   });
//   if (!updates) {
//     res.status(500).send("Unable to update plant array details");
//   }
//   res.send(updates).status(200);
// });

// // Update the plant with an image
// plantsRouter.patch("/plant/:id/image", async (req, res) => {
//   console.log("check patch");
//   await createConn();
//   const collection = await db.collection(PLANT_TABLE);

//   const query = { _id: new ObjectId(req.params.id) };
//   console.log(query, "queryyy");
//   const imageUrl = req.body.imageUrl;

//   const updates = {
//     $push: { images: imageUrl },
//   };
//   const result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // // Delete an entry
// plantsRouter.delete("/:id", async (req, res) => {
//   await createConn();
//   const collection = await db.collection(PLANT_TABLE);
//   const query = { _id: ObjectId(req.params.id) };
//   let result = await collection.deleteOne(query);
//   res.send(result).status(200);
// });

export default plantsRouter;
