const bcrypt = require('bcrypt')

const generatePassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    }catch(error) {
        return null
    }

}

const validatePassword = (password, hashPassword) => {
    try {
        return bcrypt.compare(password, hashPassword)
    }catch(error){
        return false
    }
}

module.exports = {generatePassword, validatePassword}