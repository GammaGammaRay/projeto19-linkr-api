import { db } from "../database/databaseConnection.js";

export async function CreateCommentary(author, postId, message) {
    
    const result = await db.query(`
    INSERT INTO commentaries(author, "postId", message) 
    VALUES ($1, $2, $3) 
    RETURNING id, author, message `, [
        author, postId, message
    ]);

    return result.rows[0];

}

export async function ReadCommentaries(postId) {

    const result = await db.query(`
    SELECT commentaries.author, commentaries.id, "postId", message, "profileUrl", "userName" FROM commentaries 
    INNER JOIN users ON commentaries.author = users.id
    WHERE "postId" = $1 `, [
        postId
    ]);
    
    return result.rows;

}
