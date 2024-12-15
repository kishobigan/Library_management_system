require('../models/Staff')
const Staff = require('../models/Staff')
const {generatePassword, validatePassword} = require('../utils/password')
const {generateToken, validateToken} = require('../utils/jwtUtils')

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


const staffLogin = async (req, res) => {
    const {email, password} = req.body
    try{
        const staff = await Staff.findOne({
            email:email
        })
        if(validatePassword(password, staff.password)){
            try{
                const token = generateToken(staff)
                res.status(200).json({
                    status:'success',
                    message:'login success',
                    token: token
                })
            }catch{
                res.status(401).json({
                    status:'failed',
                    message:'login failed',
                })
            }
            
        }else {
            res.status(400).json({
                status:'failed',
                message:'login failed'
            })
        }
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'Login failed'
        })
    }
}


const changePassword = async (req, res) => {
    const password = req.body
    const staff = req.user
    try {
        const hashPassword = generatePassword(password)
        staff.password = hashPassword
        staff.save()
    }catch(error) {
        res.status(400).json({
            status:'failure',
            message:'something went wrong try again later'
        })
    }
}






module.exports = {
    createStaff,
    staffLogin,
    changePassword
}