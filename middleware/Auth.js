import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");

        jwt.verify(token, process.env.SECRET_KEY)

        next()
    }
    catch(err) {
        res.status(401).send({error: err.message})
    }
}