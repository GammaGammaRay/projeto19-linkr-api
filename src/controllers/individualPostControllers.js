import { db } from "../database/databaseConnection.js"

export const handleLIke = async(req, res)=>{
    const {userId} = res.locals.userId;
    const {postId} = req.body;
    try {
        const isLiked = db.query(`
            SELECT * FROM curtidas
            WHERE author = $1 AND "postId" =$2;
        `,[userId, postId]);

        if(isLiked.rowCount===0){
            await db.query(`
                INSERT INTO curtidas (author, "postId")
                VALUES ($1, $2);
            `,[userId, postId]);    
            return res.send(201);
        }else {
            await db.query(`
                DELETE FROM curtidas WHERE id = $1;
            `,[isLiked.rows[0].id]);
            return res.send(204);
        }      

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}