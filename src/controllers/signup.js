import { hashSync } from "bcrypt";
import { CreateSession, CreateUser, ReadUserByEmail } from "../repositories/auth.repository.js";

export default async function signup(req, res) {

    const { username, profileUrl, email, password } = req.body;
    
    try {

        const user = await ReadUserByEmail(email);
        if(user) return res.status(409).send("Email já registrado!");
        
        const hash = hashSync(password, 10);

        const userId = await CreateUser(username, profileUrl, email, hash);
        await CreateSession(userId)
        
        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error); 
    }

}