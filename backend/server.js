import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/auth.routes.js";
import fileRouter from "./routes/asset.routes.js";
import Asset from "./models/Asset.js";

const app = express();
app.use(cors());
dotenv.config();

const MONGODB_URI = process.env.MONGODB_DATABASE;
mongoose
    .connect(`${MONGODB_URI}`)
    .then(() => {
        console.log("Connected to mongo!");
    })
    .catch((err) => console.log("Error: ", err));



app.use(express.json());
app.use("/api/auth", router)
app.use("/api/file", fileRouter)

const PORT = process.env.PORT;

// app.get("/", async (req, res) => {
//     try {
//         console.log("hello from the root");
//         const newAsset = Asset({
//             "_id": "64f3a2b8d1234a56789bcdef",
//             "ownerId": "64f2f1e7c9876b123456abcd",
//             "originalName": "profile-picture.png",
//             "storedName": "1691512345678-profile-picture.png",
//             "mimeType": "image/png",
//             "size": 204800,        // size in bytes (200 KB)
//             "path": "/uploads/64f2f1e7c9876b123456abcd/1691512345678-profile-picture.png",
//             "isPublic": true,
//             "createdAt": "2025-08-08T12:45:36.789Z"
//         })
//         newAsset.save()
//         res.send({ "message": "asset saved!" })
//     } catch (err) {
//         console.log("err: ", err);
//         res.status(500).send("Internal server error.");
//     }

// })




app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`)

})