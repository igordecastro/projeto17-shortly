import { Router } from "express";
import { postUrl, getUrlById, openUrl, deleteUrl } from "../controllers/urls.controller.js";
import { urlValidate, openUrlValidate, deleteUrlValidate } from "../middlewares/urlsValidate.middleware.js";
import authValidate from "../middlewares/authValidate.middleware.js";

const router = Router();

router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openUrlValidate, openUrl)
router.use(authValidate);
router.post("/urls/shorten", urlValidate, postUrl);
router.delete("/urls/:id", deleteUrlValidate, deleteUrl)

export default router;