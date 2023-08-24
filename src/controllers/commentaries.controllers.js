import { ReadUserById } from "../repositories/auth.repository.js";
import { CreateCommentary, ReadCommentaries } from "../repositories/commentaries.repository.js";


export async function getCommentaries(req, res) {

    const { postid } = req.params;
    
    try {
      
        const commentaries = await ReadCommentaries(postid);
        return res.send(commentaries);
        
    } catch (error) {
        console.log("Error while getting commentaries", error);
        return res.status(500).send(error);
    } 

}


export async function postCommentary(req, res) {
    
    const { userId } = res.locals;
    const { postId, message } = req.body;
        
    try {
        
        const commentary = await CreateCommentary(userId, postId, message);
        const user = await ReadUserById(userId);
        if(!user) return res.sendStatus(404);

        const responseObj = {...commentary, profileUrl: user.profileUrl, userName: user.userName };
      
        return res.status(201).send(responseObj);

    } catch (error) {
        console.log("Error while POSTING commentaries", error);
        return res.status(500).send(error);
    } 

}