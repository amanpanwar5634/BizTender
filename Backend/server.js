import express from "express"
import "dotenv/config"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express";
import { connectDb } from "./Config/db.js";
import clerkWebhooks from "./Controller/clerkWebhooks.js";
const app=express();
connectDb();
app.use(cors());
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// JSON parser for other routes
app.use(express.json());

// Clerk middleware (optional if using Clerk for auth-protected routes)
app.use(clerkMiddleware());

app.get('/',(req,res)=>res.send("Api is working"));
const port=3000;
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
})
