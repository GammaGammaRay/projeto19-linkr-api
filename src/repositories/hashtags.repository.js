import { db } from "../database/databaseConnection.js";
import axios from "axios";

export async function getPostsByTagDB(tagName) {
  const tagQueryResult = await db.query(`SELECT id FROM tags WHERE name = $1`, [
    "#" + tagName,
  ]);

  if (tagQueryResult.rowCount === 0) {
    return [];
  }

  const tagId = tagQueryResult.rows[0].id;

  const result = await db.query(
    `SELECT * FROM posts
       JOIN posts_tags ON posts.id = posts_tags."postId"
       WHERE posts_tags."tagId" = $1`,
    [tagId]
  );

  if (result.rowCount === 0) return [];

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

export async function getTrendingTagsDB() {
  const result = await db.query(
    `SELECT tags.name
    FROM tags
    JOIN posts_tags ON tags.id = posts_tags."tagId"
    GROUP BY tags.name
    ORDER BY COUNT(posts_tags."tagId") DESC
    LIMIT 10;`
  );

  return result.rows.map((row) => row.name);
}

export async function insertTagDB(tagName) {
  const result = await db.query(
    `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
    [tagName]
  );

  if (result.rows.length > 0) {
    return result.rows[0].id;
  }

  const existingTag = await db.query(`SELECT id FROM tags WHERE name = $1`, [
    tagName,
  ]);

  return existingTag.rows[0].id;
}

export async function insertPostTag(postId, tagId) {
  await db.query(`INSERT INTO posts_tags ("postId", "tagId") VALUES ($1, $2)`, [
    postId,
    tagId,
  ]);
}
