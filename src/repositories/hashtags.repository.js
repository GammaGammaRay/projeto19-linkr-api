import { db } from "../database/databaseConnection";

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
    `SELECT tags.name, COUNT(posts_tags."tagId") AS usage_count
    FROM tags
    JOIN posts_tags ON tags.id = posts_tags."tagId"
    GROUP BY tags.name
    ORDER BY usage_count DESC
    LIMIT 10;`
  );

  if (result.rowCount === 0) return null;
  return result.rows[0];
}

export async function insertTagDB(tagName) {
    const tagQueryResult = await db.query(
      `SELECT * FROM tags WHERE name = $1`,
      [tagName]
    );
  
    if (tagQueryResult.rowCount > 0) {
      return tagQueryResult.rows[0];
    }
  
    const query = `
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *;
    `;
  
    const values = [tagName];
  
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting new tag:", error.message);
      throw error;
    }
  }
