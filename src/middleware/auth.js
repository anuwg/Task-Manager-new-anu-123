const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth =  async function(req,res,next){
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:data._id, 'tokens.token':token})
        if(!user){
            throw new error()
        }
        req.token=token
        req.user= user
        
        next()
    }catch(e){
        res.status(401).send('please authenticate')
    }
  
}


module.exports= auth