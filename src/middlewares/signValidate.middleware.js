import { connectionDB } from "../database/db.js";
import { signupSchema } from "../models/sign.models.js";
import bcrypt from "bcrypt";

export async function signUpValidate( req, res, next) {
    const { email ,password, confirmPassword } = req.body;

    if ( password !== confirmPassword ) {
        return res.status(409).send({ message: "As duas senhas devem ser iguais" })
    }
    const userAlreadyExists = await connectionDB.query(
        "SELECT * FROM users WHERE email=$1;",
        [email]
    );
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (userAlreadyExists.rowCount !== 0) {
        return res.sendStatus(409);
    }
    
    res.locals.signup = req.body;

    next()
}

export async function signInValidate( req, res, next) {
    const { email, password } =  req.body;

    try {
        const userExists = await connectionDB.query(`SELECT * FROM users WHERE email=$1`, [email]);

        const sessionExists = await connectionDB.query(`SELECT * FROM sessions WHERE user_id=$1`, [userExists.rows[0].id]);

        if (!userExists) {
           return res.sendStatus(401);
        } 

        if(sessionExists.rowCount !== 0) {
            return res.status(409).send({message: "Usuário já está logado"})
        }

        const passwordOk = bcrypt.compareSync(password, userExists.rows[0].password);

        if (!passwordOk) {
           return res.sendStatus(401);
        }

        res.locals.user = userExists.rows[0];

   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }

   next();
}