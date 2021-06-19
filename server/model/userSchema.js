const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

// hashing password before saving!
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password = bcrypt.hashSync(this.password,12);
    }
    next();
})

//generating token for JWT 
userSchema.methods.generateAuthToken = async function(){
    try{
        let gtoken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:gtoken})
        await this.save();
        return gtoken;
    }
    catch(err){
        console.log(err);
    }
}

const User  = mongoose.model('ROOT',userSchema);

module.exports = User;