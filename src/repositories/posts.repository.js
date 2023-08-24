import { db } from "../database/databaseConnection.js"
import { insertPostTag, insertTagDB } from "./hashtags.repository.js";

export async function postsDB(link, description, userId, hashtags) {
  try {
    await db.query("BEGIN");

    const postResult = await db.query(
      `INSERT INTO posts (link, description, author) VALUES ($1, $2, $3) RETURNING *`,
      [link, description, userId]
    );

    const postId = postResult.rows[0].id;

    for (const hashtag of hashtags) {
      const tagId = await insertTagDB(hashtag);
      await insertPostTag(postId, tagId);
    }

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
}


export const amountPosts = async () => {
    const { rows } = await db.query(`
        SELECT COUNT(*) as "postCount" FROM posts;`)
    
        return Number(rows[0].postCount);
};


export async function getPostsDB(limit, offset, userId, previousUrl, nextUrl) {

    const result = await db.query(`
      SELECT 
        posts.id, 
        description, 
        link, 
        author, 
        "userName", 
        "profileUrl", 
        (SELECT COUNT(*) FROM curtidas WHERE curtidas."postId" = posts.id) AS "LikeCount",
        EXISTS(SELECT author, "postId" FROM curtidas WHERE posts.id = "postId" AND author = $3) AS "liked"
      FROM 
          posts
      INNER JOIN 
          users 
      ON 
          posts.author = users.id
      LIMIT $1
      OFFSET $2`, [limit, offset, userId, previousUrl, nextUrl]
    );

    if(result.rowCount === 0) return null;

    const posts = result.rows;
  
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      
      try {
        const response = await axios.get(`https://jsonlink.io/api/extract?url=${post.link}`)
        const { title, description, images } = response.data;
        const metadata = {title, description, images};

        posts[i].metadata = metadata;

      } catch (err) {
        console.log("Error while fetching metadata: ");
        console.log(err);
      }
    }
  
    return posts;
  };

  
  export function recentPosts(createdAt) {
    return db.query(
      `SELECT COUNT(*) AS "countPosts" FROM posts WHERE "createdAt" >= $1
      `,
      [createdAt]
    );
  };


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
  }


  export async function postRepostDB(postId, userId) {
    const result = await db.query(
      `INSERT INTO shares ("postId", "userId") VALUES ($1, $2) RETURNING *`,
      [postId, userId]
    );
  
    return result.rows[0];
  };


  export async function getRepostDB() {
    return db.query(
      `SELECT "postId", COUNT(*) AS reposts FROM shares GROUP BY "postId"`
    );
  };


  export function countRecentPosts(recentUpdate) {
    return db.query(
      `SELECT COUNT(*) AS "countPosts" FROM posts WHERE "createdAt" >= $1`,
      [recentUpdate]
    );
  };
