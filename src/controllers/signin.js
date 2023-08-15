import { v4 } from "uuid";
import { ReadUserByEmail, UpdateSession } from "../repositories/auth.repository.js";
import { compareSync, hashSync } from "bcrypt";

export default async function signIn(req, res) {
    
    const { email, password } = req.body;

    try {

        const user = await ReadUserByEmail(email);

        if(!user) return res.status(404).send("Email não cadastrado!");
        if(!compareSync(password, user.hash)) return res.status(401).send("Senha incorreta!");

        const token = v4();
        await UpdateSession(user.id, token);
        
        return res.status(200).send( {token} );
        
    } catch (error) {
        return res.status(500).send(error); 
    }

}
