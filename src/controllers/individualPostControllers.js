import { db } from "../database/databaseConnection.js";
import {deletePostsDB, editPostDB, returnUserId} from "../repositories/individualPost.repository.js";


export const handleLIke = async(req, res)=>{
    const {userId} = res.locals.userId;
    const {postId} = req.body;
    try {
        const isLiked = await db.query(`
            SELECT * FROM curtidas
            WHERE author = $1 AND "postId" =$2;
        `,[userId, postId]);
    
        if(isLiked.rowCount === 0){
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


export async function editPost(req, res) {
    const { id } = req.params;
    const { link, description } = req.body;
    try {
      const userId = await returnUserId(req);
      await editPostDB(id, link, description, userId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  

  export async function deletePost(req, res) {
    const { id } = req.params;
    try {
      const userId = await returnUserId(req);
      await deletePostsDB(id, userId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
