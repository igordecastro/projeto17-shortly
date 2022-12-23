import { connectionDB } from "../database/db.js";

export default async function authValidate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token)
    return res.status(401).send({ message: "Token incorreto ou inexistente" });

  try {
    const session = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
    const user = await connectionDB.query(`SELECT * FROM users WHERE id= $1;`, [session.rows[0]?.user_id]);

    if (user.rowCount === 0) {
      return res.sendStatus(404)
    }

    delete user.password;

    req.validUser = user.rows[0];
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }

  next();
}