import {postsDB, getPostsDB, recentPosts, amountPosts} from "../repositories/posts.repository.js";
import { extractHashtags } from "./hashtagsControllers.js";


export async function createPosts(req, res) {
    try {
      const { link, description, author} = req.body;
    
      let hashtags = extractHashtags(description)
      
      await postsDB(link, description, author, hashtags);
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


export async function getPosts(req, res) {
    try {
      console.log(res.locals);
      const { userId } = res.locals; 
      let { limit, offset } = req.query;

      if (!limit) limit = 10;
      if (!offset) offset = 0;
  
      const { rows } = await recentPosts(); 
      const numberPosts = await amountPosts();
      
      const totalPosts = rows[0].amountPosts;
      const newUrl = req.route.path;
  
      const next = offset + limit;
      const nextUrl =
        next < numberPosts ? `${newUrl}?limit=${limit}&offset=${next}` : null;
  
      const previous = offset - limit < 0 ? null : offset - limit;
      const previousUrl =
        previous != null
          ? `${newUrl}?limit=${limit}&offset=${previous}`
          : null;
  
      const posts = await getPostsDB(limit, offset, userId);
  
      return res.status(200).send(posts);

    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
