const jwt = require('jsonwebtoken');
const JWT_SECRET = "I_have_Developed_This_API_So_dont_try_to_hack_it"

const fetchuser = (req, res, next)=>{
    //Get the user from the JWT Token and add id to request object
    const tokan =  req.header("auth-tokan")
    if(!tokan){
        return res.status(401).send({error:"please authenticate using a valid tokan"})
    }
    try {
        const data = jwt.verify(tokan,JWT_SECRET)
        req.id = data.id;
    next();
    } catch (error) {
        return res.status(401).send({error:"please authenticate using a valid tokan."})
    }
    
}

module.exports = fetchuser;