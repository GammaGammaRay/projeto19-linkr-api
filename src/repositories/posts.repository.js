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
    const newObject = `
      SELECT JSONB_BUILD_OBJECT(
        'userName', users."userName",
        'id', posts."id",
        'description', posts.description, 
        'link', posts.link,
        'author', posts."author" 
      ) AS post
      FROM users
      INNER JOIN posts ON posts.author = users.id
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  
    const result = await db.query(newObject);
    const list = result.rows;
  
    const metadata = list.map(async (e) => {
      try {
        const link = e.post.url
        await axios
          .get(`https://jsonlink.io/api/extract?url=${link}`)
          .then(res => {
  
            const { title, description } = res.data
            e.post.urlTitle = title || ''
            e.post.urlDescr = description || ''
          })
      } catch (err) {
        return;
      }
      return e.post;
    });
  
    await Promise.all(metadata);
  
    return list.map((p) => {
      return p.post;
    });
  };
// export async function getPostsDB(limit, offset) {
//     const newObject = `
//       SELECT JSONB_BUILD_OBJECT(
//         'userName', users."userName",
//         'id', posts."id",
//         'description', posts.description, 
//         'link', posts.link,
//         'tagId', posts_tags."tagId",
//         'author', posts."author" 
//       ) AS post
//       FROM users
//       INNER JOIN posts ON posts.author = users.id
//       LIMIT ${limit}
//       OFFSET ${offset}
//     `;
  
//     const result = await db.query(newObject);
//     const list = result.rows;
  
//     const metadata = list.map(async (e) => {
//       try {
//         const link = e.post.url
//         await axios
//           .get(`https://jsonlink.io/api/extract?url=${link}`)
//           .then(res => {
  
//             const { title, description } = res.data
//             e.post.urlTitle = title || ''
//             e.post.urlDescr = description || ''
//           })
//       } catch (err) {
//         return;
//       }
//       return e.post;
//     });
  
//     await Promise.all(metadata);
  
//     return list.map((p) => {
//       return p.post;
//     });
//   };


  export function recentPosts(createdAt) {
    return db.query(
      `SELECT COUNT(*) AS "countPosts" FROM posts WHERE "createdAt" >= $1
      `,
      [createdAt]
    );
  };