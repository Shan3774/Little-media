import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next ) => {
    try {
        let token = req.headers("Authorization");
        if(!token) res.status(403).send("Unauthorized");//may be better to send a json with msg
    
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimleft()// trim may not be necessary
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({error: err.message})
    }

}