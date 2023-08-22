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
      `UPDATE posts SET link = $1, description = $2 WHERE id = $3 AND "author" = $4`,
      [link, description, id, userId]
    );
  };


  export function deletePostsDB(id, userId) {
    return db.query(`DELETE FROM posts WHERE id = $1 AND "author" = $2`, [
      id,
      userId,
    ]);
  };