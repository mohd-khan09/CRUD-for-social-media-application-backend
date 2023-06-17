import express from "express";
import { getAllUsers, logIn, signUp } from "../controller/user-controller";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signUp", signUp);
router.post("/login", logIn);
export default router;
