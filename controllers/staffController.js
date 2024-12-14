require('../models/Staff')
const {generatePassword, validatePassword} = require('../utils/password')

const createStaff = async (req, res) => {
    const {name, email, phone, position, salary} = req.body
    const password = 'abcd1234'
    
    if(!name || !email || !phone || !position || !salary){
        res.status(400).json({
            status:'failed',
            message:'All fields are required'
        })
    }

    try {

        const hashPassword = generatePassword(password)

        const staff = new Staff({
            name,
            email,
            phone,
            position,
            salary,
            password:hashPassword
        })

        const savedStaff = await staff.save()

        res.status(201).json({
            status:'success',
            message:'staff successfully created'
        })

    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'something went wrong'
        })
    }
}






module.exports = {
    createStaff
}