import { ReadSession } from "../repositories/auth.repository.js";

export async function tokenValidation (req, res, next ){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {

        if (!token) return res.status(401).send('Token inválido!');

        const session = await ReadSession(token);

        if(!session) return res.status(401).send('Token inválido!');

        res.locals.userId = session.userId;
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }

}