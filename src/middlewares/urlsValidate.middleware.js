import { urlSchema } from "../models/url.models.js";
import { connectionDB } from "../database/db.js";

export function urlValidate(req, res, next) {
    const { error } = urlSchema.validate(req.body, {abortEarly: false})

    if(error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    next();
}

export async function openUrlValidate(req, res, next) {
    const { shortUrl } = req.params;

    const url = await connectionDB.query(`SELECT * FROM urls WHERE shorten_url=$1`, [shortUrl]);

    if(url.rowCount === 0) {
        return res.sendStatus(404)
    } else {
        req.url = url.rows[0]
    }
    
    next()
}

export async function deleteUrlValidate(req, res, next) {
    const { id } = req.params;
    const userId = req.validUser.id;

    const url = await connectionDB.query(`SELECT user_id FROM urls WHERE id=$1`, [id])
    
    if(url.rowCount === 0) {
        return res.sendStatus(404)
    }

    if(url.rows[0].user_id !== userId) {
        return res.sendStatus(401)
    }

    next()
}