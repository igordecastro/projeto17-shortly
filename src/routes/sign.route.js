import { Router } from "express";
import { signin, signup } from "../controllers/sign.controller.js";
import { signInValidate, signUpValidate } from "../middlewares/signValidate.middleware.js";

const router = Router()

router.post("/signup", signUpValidate, signup)
router.post("/signin", signInValidate, signin)

export default router;