const jwt =require("jsonwebtoken");

const authenticateJWT=(req,res,next)=>{
    const token=req.cookies.access_token;
    // console.log(token);
    if (!token) 
        return res.status(401).json({ msg: "No token, authorization denied" });
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
          return res.status(403).json({ msg: "Invalid token" });
        req.user = user; // Attach user info to the request object
        next(); // Continue to the next middleware or route handler
      });

}
module.exports = authenticateJWT;