const jwt = require('jsonwebtoken');
const BlogData = require('../model/blogSchema');
const User = require('../model/userSchema');

const Authenticate =async (req,res,next)=>{
    console.log("authentification underprocess")
    try{
        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})
        const blogData = await BlogData.find();
        if (!rootUser){
            throw new Error('user not found')
        }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        req.BlogData = blogData;
        req.session.BlogData = blogData;
        req.session.userID = rootUser._id;
        next();
    }
    catch(err){
        res.status(401).send('unauthoriszed:No token Provided')
        console.log(err)
    }
}
module.exports = Authenticate