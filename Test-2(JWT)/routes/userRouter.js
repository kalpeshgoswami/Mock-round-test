import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/add", userController.addUser);

router.get("/AllUser", userController.AllUser);

router.get("/login",userController.UserLogin);

export default router;