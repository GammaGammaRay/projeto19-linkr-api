import { db } from "../database/databaseConnection.js"

export const handleLIke = async(req, res)=>{
    const {userId} = res.locals.userId;
    const {postId} = req.params;
    try {
        await db.query(`
            INSERT INTO curtidas (author, "postId")
            VALUES ($1, $2);
        `,[userId, postId]);    
        res.send(201);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}