import { ReadUserById } from "../repositories/auth.repository.js";
import { CreateCommentary, ReadCommentaries } from "../repositories/commentaries.repository.js";


export async function getCommentaries(res, req) {

    const { postId } = req.params;
    
    try {
      
        const commentaries = await ReadCommentaries(postId);
        return res.send(commentaries);
        
    } catch (error) {
        console.log("Error while getting commentaries", error);
        return res.status(500).send(error);
    } 

}


export async function postCommentary(res, req) {
    
    const { userId } = res.locals;
    const { postId, message } = req.body;
        
    try {
        
        const commentary = await CreateCommentary(userId, postId, message);
        const user = await ReadUserById(commentary.id);
        
        const responseObj = {...commentary, profileUrl: user.profileUrl, userName: user.userName };
      
        return res.status(201).send(responseObj);

    } catch (error) {
        console.log("Error while getting commentaries", error);
        return res.status(500).send(error);
    } 

}