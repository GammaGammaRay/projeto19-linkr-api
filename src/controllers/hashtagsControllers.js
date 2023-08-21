import { getPostsByTagDB, getTrendingTagsDB, insertTagDB } from "../repositories/hashtags.repository.js";


export async function getTrendingTags(req, res) {
  
    try {
      const users = await getTrendingTagsDB();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  export async function getPostsByTag(req, res) {
    console.log(req)
    const { tagName } = req.params;
  
    try {
      const posts = await getPostsByTagDB(tagName);
  
      if (posts.length === 0) {
        res.status(404).send("Hashtag not found");
      } else {
        res.status(200).send(posts);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  export async function postNewTag(req, res) {
    const { tagName } = req.params;
  
    try {
      const tag = await insertTagDB(tagName)
      res.status(200).send(tag);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  export function extractHashtags(description) {
    const hashtags = description.match(/#\w+/g);
    return hashtags || [];
  }