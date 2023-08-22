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


export async function getPostsDB(limit, offset) {

    const { userId } = res.locals; 

    const result = await db.query(`
      SELECT 
        posts.id, 
        description, 
        link, 
        author, 
        "userName", 
        "profileUrl", 
        (SELECT COUNT(*) FROM curtidas WHERE curtidas."postId" = posts.id) AS "LikeCount",
        EXISTS(SELECT author, "postId" FROM curtidas WHERE posts.id = "postId" AND author = $3) AS "liked",
        metadata {title, description, images}
      FROM 
          posts
      INNER JOIN 
          users 
      ON 
          posts.author = users.id
      LIMIT $1
      OFFSET $2`, [limit, offset, userId]
    );

    if(result.rowCount === 0) return null;

    const posts = result.rows;
    const metadata = posts.map(async (post, index) => {
      try {
        const response = await axios.get(`https://jsonlink.io/api/extract?url=${post.link}`)
        const { title, description, images } = response.data;
        const metadata = {title, description, images};

        posts[index].metadata = metadata;
        return metadata;

      } catch (err) {
        console.log("Error while fetching metadata: ");
        console.log(err);
        return;
      }
    });
  
    await Promise.all(metadata);
  
    return posts;
  };

  export function recentPosts(createdAt) {
    return db.query(
      `SELECT COUNT(*) AS "countPosts" FROM posts WHERE "createdAt" >= $1
      `,
      [createdAt]
    );
  };