const connection = require('../models');
const fetchQuery = require('./queryFetcher');


exports.createComment=async function (req,res,next){
    try{
        let newComment={
            text:req.body.text,
            created_at:new Date(),
            updated_at:new Date(),
            user_id:req.params.id,
            blog_id:req.params.blog_id,
        }
        let query='INSERT INTO comments SET ?';
        let userQuery = `SELECT * FROM users WHERE id=${req.params.id}`;
        let results = await Promise.all([
            fetchQuery.fetchWithValues(query,connection,newComment),
            fetchQuery.fetch(userQuery, connection)
        ]);
        let foundComment={
            id:results[0].insertId,
            ...newComment,
            username:results[1][0].username,
            profileImageUrl:results[1][0].profileImageUrl,
        }

        return res.status(200).json(foundComment);

    }catch(err){
        return next(err);
    }
}


exports.getComments=async function(req,res,next){
    try {
        const blogId=req.params.blog_id;
        let query=`SELECT c.* ,u.username,u.profileImageUrl from comments c
                   inner join users u on c.user_id=u.id where c.blog_id=${blogId} 
                   order by c.created_at desc`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json({results,count:results.length});
    } catch (err) {
        return next(err);
    }
}

exports.getLike=async function(req,res,next){
    try{
        const userId=req.params.id;
        const blogId=req.params.blog_id;
        let query=`select * from likes where user_id=${userId} and blog_id=${blogId}`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json({res:results.length!==0});
    }catch(err){
        return next(err);
    }
}
exports.postLike=async function(req,res,next){
    try{
        let like={
            user_id:req.params.id,
            blog_id:req.params.blog_id,
        }
        let query='INSERT INTO likes SET ?';
        let results=await fetchQuery.fetchWithValues(query,connection,like);
        return res.status(200).json(like);
    }catch(err){
        return next(err);
    }
}

exports.deleteLike=async function(req,res,next){
    try {
        let query=`DELETE FROM likes WHERE
                   user_id=${req.params.id} and blog_id=${req.params.blog_id}`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}

exports.getSaveBlog=async function(req,res,next){
    try{
        const userId=req.params.id;
        const blogId=req.params.blog_id;
        let query=`select * from savedBlogs where user_id=${userId} and blog_id=${blogId}`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json({res:results.length!==0});
    }catch(err){
        return next(err);
    }
}


exports.saveBlog=async function(req,res,next){
    try{
        let save={
            user_id:req.params.id,
            blog_id:req.params.blog_id,
            saved_at:new Date(),
        }
        let query='INSERT INTO savedBlogs SET ?';
        let results=await fetchQuery.fetchWithValues(query,connection,save);
        return res.status(200).json(save);
    }catch(err){
        return next(err);
    }
}

exports.deleteSaveBlog=async function(req,res,next){
    try {
        let query=`DELETE FROM savedBlogs WHERE
                   user_id=${req.params.id} and blog_id=${req.params.blog_id}`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}