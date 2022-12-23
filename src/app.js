import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signRoutes from "./routes/sign.route.js"
import urlRoutes from "./routes/urls.route.js"
import usersRoutes from "./routes/users.route.js"
import rankingRoute from "./routes/ranking.route.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use(signRoutes)
app.use(rankingRoute)
app.use(urlRoutes)
app.use(usersRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));