import { connectionDB } from "../database/db.js";

export async function getUser(req, res) {
    const user = req.validUser;

    try {
        const { rows } = await connectionDB.query(`
        SELECT users.id, users.name, COUNT(urls.visit_count) AS visit_count, urls.* AS shortened_urls
        FROM users 
        JOIN urls ON users.id = urls.user_id 
        WHERE users.id=$1 
        GROUP BY users.id, urls.id;`, 
        [user.id]);

        res.status(200).send(rows)
    } catch(err) {
        res.status(500).send(err.message)
    }
}