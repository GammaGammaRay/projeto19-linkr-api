import { db as connection } from "../database/databaseConnection.js";
import axios from "axios";

export async function searchUsersRepository(string) {
  return connection.query(`SELECT * FROM users WHERE "userName" ILIKE $1`, [
    `%${string}%`,
  ]);
}

export async function getUserPostsRepository(id) {
  const result = await connection.query(
    `
      SELECT 
        posts.id, 
        description, 
        link, 
        author, 
        "userName", 
        "profileUrl", 
        (SELECT COUNT(*) FROM curtidas WHERE curtidas."postId" = posts.id) AS "LikeCount",
        EXISTS(SELECT author, "postId" FROM curtidas WHERE posts.id = "postId" AND author = $1) AS "liked"
      FROM 
          posts
      INNER JOIN 
          users 
      ON 
          posts.author = users.id
      WHERE users.id = $1`,
    [id]
  );

  if (result.rowCount === 0) return (await connection.query(`SELECT "userName", "profileUrl" FROM users WHERE users.id = $1`, [id])).rows;

  const posts = result.rows;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    try {
      const response = await axios.get(
        `https://jsonlink.io/api/extract?url=${post.link}`
      );
      const { title, description, images } = response.data;
      const metadata = { title, description, images };

      posts[i].metadata = metadata;
    } catch (err) {
      console.log("Error while fetching metadata: ");
      console.log(err);
    }
  }

  return posts;
}

export async function followUserRepository(userId, id) {
  return connection.query(
    `INSERT INTO follows ("userId", "followingId") VALUES ($1, $2)`,
    [userId, id]
  );
}

export async function getUserFollowingRepository(userId) {
  return connection.query(
    `SELECT "followingId" FROM follows WHERE follows."userId" = $1`,
    [userId]
  );
}

export async function unFollowUserRepository(userId, id) {
  return connection.query(
    `DELETE FROM follows WHERE follows."userId" = $1 AND follows."followingId" = $2`,
    [userId, id]
  );
}
