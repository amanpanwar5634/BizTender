import express from "express";
 import { protect } from "../middlewares/authMiddleware.js";
import { getUserData,storeRecentSearchedTenders } from "../Controller/userController.js";
const userRouter=express.Router();
userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedTenders);
export default userRouter;