import { getUserPostsRepository, searchUsersRepository } from "../repositories/users.repository.js";

export async function searchUsers(req, res) {
  const { string } = req.params;

  try {
    const users = (await searchUsersRepository(string)).rows;
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const posts = await getUserPostsRepository(id);

    res.status(200).send({
      results: posts.map((post) => ({
        id: post.id,
        link: post.link,
        author: post.author,
        tagId: post.tagId,
        userName: post.userName,
        description: post.description,
        profileUrl: post.profileUrl,
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
