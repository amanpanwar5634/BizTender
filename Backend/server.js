import express from "express"
import "dotenv/config"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express";
import { connectDb } from "./Config/db.js";
import { connectCloudinary } from "./Config/cloudinary.js";
import clerkWebhooks from "./Controller/clerkWebhooks.js";
import userRouter from "./Router/useroutes.js";
import CompanyRouter from "./Router/compnayRoute.js";
import tenderRouter from "./Router/tenderRoute.js";
import applicationRouter from "./Router/ApplicationRoute.js";
const app=express();
connectDb();
connectCloudinary();
app.use(cors());
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// JSON parser for other routes
app.use(express.json());

// Clerk middleware (optional if using Clerk for auth-protected routes)
app.use(clerkMiddleware());

app.get('/',(req,res)=>res.send("Api is working"));
app.use('/api/user',userRouter);
app.use('/api/companies',CompanyRouter);
app.use('/api/tenders',tenderRouter);
app.use('/api/applications',applicationRouter);
const port=3000;
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
})
