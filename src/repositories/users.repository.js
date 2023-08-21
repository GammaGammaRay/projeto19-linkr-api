import { db as connection } from "../database/databaseConnection.js";

export async function searchUsersRepository(string) {
  return connection.query(`SELECT * FROM users WHERE "userName" ILIKE $1`, [
    `%${string}%`,
  ]);
}

export async function getUserPostsRepository(id) {
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
      WHERE users.id = $1
      UNION
      SELECT JSONB_BUILD_OBJECT(
        'userName', users."userName",
        'profileUrl', users."profileUrl"
      ) AS user
      FROM users
      WHERE users.id = $1
    `;

  const result = await connection.query(newObject, [id]);
  const list = result.rows;

  const metadata = list.map(async (e) => {
    try {
      const link = e.post.url;
      await axios
        .get(`https://jsonlink.io/api/extract?url=${link}`)
        .then((res) => {
          const { title, description } = res.data;
          e.post.urlTitle = title || "";
          e.post.urlDescr = description || "";
        });
    } catch (err) {
      return;
    }
    return e.post;
  });

  await Promise.all(metadata);

  return list.map((p) => {
    return p.post;
  });
}
