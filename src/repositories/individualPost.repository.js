import { db } from "../database/databaseConnection.js"

export async function returnUserId(req) {
    try {
      const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");
      const databaseToken = await db.query(
        "SELECT * FROM sessions WHERE token = $1",
        [token]
      );
      const { userId } = databaseToken.rows[0];
      return userId;
    } catch (error) {
      return error;
    }
  };

  
  export function editPostDB(id, link, description, userId) {
    return db.query(
      `UPDATE posts SET link = $1, description = $2 WHERE id = $3 AND "userId" = $4`,
      [link, description, id, userId]
    );
  };


  export function deletePostsDB(id, userId) {
    db.query(`DELETE FROM curtidas WHERE "postId" = $1`, [
      id
    ]);
    return db.query(`DELETE FROM posts WHERE id = $1 AND "userId" = $2`, [
      id,
      userId,
    ]);
  };