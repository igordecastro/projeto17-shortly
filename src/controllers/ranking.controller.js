import { connectionDB } from "../database/db.js";

export async function ranking(req, res) {

    try {
        const rank = await connectionDB.query(`
            SELECT
                users.id, 
                users.name, 
                COUNT(urls.id) AS links_count, 
                COUNT(urls.visit_count) AS visit_count
            FROM users
            JOIN urls
                ON users.id = urls.user_id
            GROUP BY 
                users.id
            ORDER BY visit_count
            LIMIT 10
        `)

        res.status(200).send(rank.rows)
    } catch(err) {
        res.status(500).send(err.message)
    }
}