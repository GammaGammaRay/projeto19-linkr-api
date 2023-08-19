import { getPostsByTagDB, getTrendingTagsDB } from "../repositories/hashtags.repository";


export async function getTrendingTags(req, res) {
  
    try {
      const users = (await getTrendingTagsDB());
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  export async function getPostsByTag(req, res) {
    const { tagName } = req.params;
  
    try {
      const users = await getPostsByTagDB(tagName)
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }