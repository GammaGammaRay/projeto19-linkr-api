import { v4 } from "uuid";
import { CreateSession, CreateUser, ReadUserByEmail, UpdateSession } from "../repositories/auth.repository";
import { compareSync, hashSync } from "bcrypt";

export default async function signIn(req, res) {
    
    const { email, password } = req.body;

    try {
        const user = await ReadUserByEmail(email);
        if(!user) return res.send(404).send("Email não cadastrado!");
        
        if(!compareSync(password, user.password)) return res.status(401).send("Senha incorreta!");

        const token = v4();
        
        await UpdateSession(user.id, token);
        
        return res.status(200).send( {token} );
        
    } catch (error) {
        return res.status(500).send(error); 
    }

}

export default async function signUp(req, res) {
    
    const { username, profileUrl, email, password } = req.body;

    try {
        const user = await ReadUserByEmail(email);
        if(user) return res.send(409).send("Email já registrado!");
        
        const hash = hashSync(password, 10);

        const userId = await CreateUser(username, profileUrl, email, hash);
        await CreateSession(userId)
        
        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error); 
    }

}