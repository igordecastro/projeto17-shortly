import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4} from "uuid";
import dayjs from "dayjs";

export async function signup(req, res) {
    const { name, email, password } = res.locals.signup;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await connectionDB.query(
            `INSERT INTO users(name, email, password ) VALUES ($1, $2, $3)`,
            [name, email, hashPassword]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin(req, res) {
    const user = res.locals.user;
    const token = uuidV4();
    const date = dayjs().format("DD/MM/YYYY")

    try {
        await connectionDB.query(`INSERT INTO sessions (token, user_id, created_at) VALUES ($1, $2, $3)` , [token,user.id, date])

        res.send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}