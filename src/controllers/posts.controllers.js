import {postsDB, getPostsDB, recentPosts, amountPosts, postRepostDB, getRepostDB, countRecentPosts} from "../repositories/posts.repository.js";
import { returnUserId } from "../repositories/posts.repository.js";
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
  
      if (!limit) limit = 20;
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
  
      const posts = await getPostsDB(limit, offset, userId, previousUrl, nextUrl);
  
      return res.status(200).send(posts);

    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  export async function postRepost(req, res) {
    const { id } = req.params;
  
    try {
      const userId = await returnUserId(req);
      await postRepostDB(id, userId);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

  export async function getRepost(req, res) {
    try {
      const repost = await getRepostDB();
      res.status(200).send(repost.rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  export async function newPosts(req, res) {
    const { recentUpdate } = req.query;
    try {
      const countPosts = await countRecentPosts(recentUpdate);
      res.status(200).send(countPosts.rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
