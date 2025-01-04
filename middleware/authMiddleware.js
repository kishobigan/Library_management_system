const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1]; // Correctly split on space
    if (!token) {
        return res.status(401).json({
            error: 'Access Denied, Token has not been provided'
        });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = authToken;
