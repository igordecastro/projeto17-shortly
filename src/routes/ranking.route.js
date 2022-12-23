import { Router } from "express"
import { ranking } from "../controllers/ranking.controller.js"

const router = Router();

router.get("/ranking", ranking)

export default ranking;