const connection = require('../models');
const fetchQuery = require('./queryFetcher');


exports.getfollow=async function(req,res,next){
    try{
        const userId=req.params.id;
        const followeeId=req.params.user_id;
        let query=`select * from followers where 
                   followee_id=${followeeId} and follower_id=${userId}`;
        let results=await fetchQuery.fetch(query,connection);
        return res.status(200).json({res:results.length!==0});
    }catch(err){
        return next(err);
    }
}
exports.follows=async function(req,res,next){
    try {
        let follow={
            follower_id:req.params.id,
            followee_id:req.params.user_id,
        }
        let query ='INSERT INTO followers SET ?';
        let results = await fetchQuery.fetchWithValues(query,connection,follow);
        return res.status(200).json(follow);
    } catch (err) {
        return next(err);
    }
}
exports.unfollows=async function(req,res,next){
    try {
        let follow={
            follower_id:req.params.id,
            followee_id:req.params.user_id,
        }
        let query =`DELETE FROM followers WHERE 
                    followee_id=${follow.followee_id} and follower_id=${follow.follower_id}`;
        let results = await fetchQuery.fetchWithValues(query,connection,follow);
        return res.status(200).json(follow);
    } catch (err) {
        return next(err);
    }
}