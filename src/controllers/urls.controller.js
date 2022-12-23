import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export async function postUrl(req, res) {
    const { url } = req.body;
    const date = dayjs().format("DD/MM/YYYY");
    const shortenUrl = nanoid();
    const userId = req.validUser.id;

    try {
        await connectionDB.query(
            `INSERT INTO urls (original_url, shorten_url, created_at, visit_count, user_id) VALUES ($1, $2, $3, $4, $5)`,
            [url, shortenUrl, date, 0, userId]
        );
        res.status(201).send({ shortUrl: shortenUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const { rows } = await connectionDB.query(
            `SELECT id, shorten_url AS "shortUrl", original_url AS url FROM urls WHERE id=$1`,
            [id]
        );

        if (rows.length === 0) {
            return res.sendStatus(404);
        }
        res.status(200).send(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const url = req.url.original_url;
    const count = req.url.visit_count;

    await connectionDB.query(
        `UPDATE urls SET visit_count=$1 WHERE original_url=$2;`,
        [count + 1, url]
    );

    res.redirect(301, url);
}

export async function deleteUrl(req, res) {
    const { id } = req.params;

    try {
        await connectionDB.query(`DELETE FROM urls WHERE id=$1`, [id]);

        res.sendStatus(204);
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}
