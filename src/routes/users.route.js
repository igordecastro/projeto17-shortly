import { getUser } from "../controllers/users.controller.js";
import { Router } from "express";

const router = Router();

router.get("/users/me", getUser)

export default router;