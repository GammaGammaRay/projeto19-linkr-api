import {
  getUserPostsRepository,
  searchUsersRepository,
  followUserRepository,
  getUserFollowingRepository,
  unFollowUserRepository,
} from "../repositories/users.repository.js";

export async function searchUsers(req, res) {
  const { string } = req.params;

  try {
    const users = (await searchUsersRepository(string)).rows;
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const posts = await getUserPostsRepository(id);

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function followUser(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    await followUserRepository(userId, id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function getFollowing(req, res) {
  const { userId } = res.locals;

  try {
    const result = await getUserFollowingRepository(userId);
    const following = result.rows.map((row) => row.followingId);
    return res.status(200).send(following);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function unfollowUser(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    await unFollowUserRepository(userId, id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}