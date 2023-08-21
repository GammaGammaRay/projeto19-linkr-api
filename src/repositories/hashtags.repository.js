import { db } from "../database/databaseConnection.js";

export async function getPostsByTagDB(tagName) {
  const tagQueryResult = await db.query(`SELECT id FROM tags WHERE name = $1`, [
    tagName,
  ]);

  if (tagQueryResult.rowCount === 0) {
    return [];
  }

  const tagId = tagQueryResult.rows[0].id;

  const postsQueryResult = await db.query(
    `SELECT * FROM posts
       JOIN posts_tags ON posts.id = posts_tags."postId"
       WHERE posts_tags."tagId" = $1`,
    [tagId]
  );

  return postsQueryResult.rows;
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
