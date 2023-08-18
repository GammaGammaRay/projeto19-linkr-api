import {postsDB, getPostsDB, recentPosts, amountPosts} from "../repositories/posts.repository.js";


export async function createPosts(req, res) {
    try {
      const { url, description} = req.body;
    
      await postsDB(url, description);
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


export async function getPosts(req, res) {
    try {
      let { limit, offset } = req.query;
  
      if (!limit) limit = 5;
      if (!offset) offset = 0;
  
      const { rows } = await recentPosts(); 
      const numberPosts = await amountPosts();
      console.log(rows)
      
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
  
      const posts = await getPostsDB(limit, offset);
  
      res.status(200).send({
        previousUrl,
        nextUrl,
        limit,
        offset,
        totalPosts,
  
        results: posts.map((post) => ({
          id: post.id,
          link: post.link,
          author: post.author,
          tagId: post.tagId,
          userName: post.userName,
          description: post.description,
        })),      
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
