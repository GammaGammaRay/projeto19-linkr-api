import { searchUsersRepository } from "../repositories/users.repository.js";

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
