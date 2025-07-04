import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import { getCompany, getOwnerCompany, registerCompany } from "../Controller/CompanyController.js";
import upload from "../middlewares/uploadMiddleware.js";
const CompanyRouter=express.Router();
CompanyRouter.post("/",protect,upload.fields([{ name: "logo", maxCount: 1 }, { name: "gallery", maxCount: 4 }, ]),
registerCompany
);
CompanyRouter.get('/owner',protect,getOwnerCompany);
 CompanyRouter.get('/tender/:tenderId',getCompany);
export default CompanyRouter;
