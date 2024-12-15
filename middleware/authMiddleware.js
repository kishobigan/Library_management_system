const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

const authToken = (req, res, next) => {
    const token = req.header('Authorization')?.split('')[1]
    if(!token){
        return res.status(401).json({
            error:'Access Denied, Token has not provided'
        })
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified
        next()
    }catch(error){
        res.status(400).json({ error: 'Invalid Token' });
    }
}