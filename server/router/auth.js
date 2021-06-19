const express  = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('../db/conn');
const User = require('../model/userSchema');
const Blog = require('../model/blogSchema')
const authenticate = require('../middleware/authenticate');



router.get('/',(req,res)=>{
    res.send('checking the start page')
})

router.get('/login',(req,res)=>{
    res.send('login _')
})

router.get('./register',(req,res)=>{
    res.send('register_')
})
router.post('/register',async(req,res)=>{
    const {name,email,phonenumber,password,cpassword} = req.body
    console.log(req.body)
    if (!name || !email || !phonenumber || !password || !cpassword){
        return res.status(422).json({error:'All the fields are required!'});
    }
    if(password!=cpassword){
        return res.status(422).json({error:'passwords do not match'});
    }
    try{
        const userExists = await User.findOne({email:email})

        if(userExists){
            console.log('repeated user')
            return res.status(422).json({error:'User already exists!'})
        }
        
        const user = new User({name,email,phonenumber,password});
        
        //hashing here
        await user.save();

        res.status(201).json({message:'User registered successfuly'})
        
    }

    catch (err){
        console.log(err);
    }
})

router.post('/login',async(req,res)=>{
    console.log('????????')
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({error:'all fields are mandatory1'})
        }

        const userLogin = await User.findOne({email:email});

        if (userLogin){
        const match = await bcrypt.compare(password, userLogin.password)
        
        const token = await userLogin.generateAuthToken();

        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() + 300000),
            httpOnly:true
        })
        if(!match){
            res.status(400).json({error:'Failed to Login'})
        }
        else{
            if(email==process.env.ADMIN){
                const msg={
                    login:'admin'
                }
                res.send(msg)
            }
            else{
                const msg={
                    login:'user'
                }
                res.send(msg)
            }
        }
        }
        else{
            res.status(400).json({error:'Failed to Login'})
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get('/AdminBlog',authenticate,(req,res)=>{
    console.log('authenticated admin page')
    res.send(req.rootUser)
})

router.get('/Blogs',authenticate,async(req,res)=>{
    console.log('authenticated admin page')
    // console.log(blogData[0].title);
    res.send(req.session)
})

router.get('/createBlog',authenticate,(req,res)=>{
    if(req.rootUser.email == process.env.ADMIN){
        res.send(req.rootUser)
        res.end('end')
    }
    else{
        res.send(422).json({error:'only admin access allowed!'})
    }
})
router.get('/editBlogs',authenticate,(req,res)=>{
    res.send(req.session)
})

router.post('/editBlogs',authenticate,(req,res)=>{
    Blog.deleteOne({_id:req.body.blogId},(err,results)=>{
        if(err){
            console.log(err);
        }
    })
    return res.status(200).json({msg:'deleted'})
})

router.post('/sendPost',async(req,res)=>{
    const {title,msg} = req.body
    console.log('blog data recieved at backend')
    try{
    const blog = new Blog({title,msg});
    await blog.save();
    return res.status(200).json({message:'success'})
    }
    catch(err){
        console.log(err)
        return res.status(422).json({error:'cannot post blog'})
    }
})

router.get('/logout',async(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('Logout')
})

router.put('/likeBlog',authenticate,(req,res)=>{
    Blog.findByIdAndUpdate(req.body.blogId,{
        $push:{likes:req.rootUser._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            console.log(err);
            return res.status(422).json({error:err})
        }
        else{
            const userId = req.userID;
            console.log(userId)
            res.json(userId)
        }
    })
})



module.exports = router;
