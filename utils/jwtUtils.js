const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY
const EXPIRES_IN = process.env.EXPIRES_IN

const generateToken = (payload) => {
    console.log(payload)
    return jwt.sign(payload, SECRET_KEY, {expiresIn: EXPIRES_IN})
}

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }catch(Error) {
        console.log('Invalid Token')
        return null
    }
}

module.exports = {generateToken, validateToken}