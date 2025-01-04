require('../models/Staff')
const Staff = require('../models/Staff')
const {generatePassword, validatePassword} = require('../utils/password')
const {generateToken, validateToken} = require('../utils/jwtUtils')

const createStaff = async (req, res) => {
    const {name, email, phone, position, salary} = req.body
    const password = 'abcd1234'
    const user = req.user
    if(user.role !== 'staff') {
        res.status(401).json({
            status:'failed',
            message: 'only staff can create staff'
        })
    }
    
    if(!name || !email || !phone || !position || !salary){
        res.status(400).json({
            status:'failed',
            message:'All fields are required'
        })
    }

    try {

        const hashPassword = await generatePassword(password)

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
        if(!staff){
            res.status(400).json({
                status:'failed',
                message:'Incorrect username password'
            })
        }
        if(await validatePassword(password, staff.password)){
            try{
                const payload = {
                    id:staff._id,
                    name:staff.name,
                    role:'staff'
                }
                const token = generateToken(payload)
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
        }
        else {
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
    const {password} = req.body
    const user = req.user

    if(!password){
        res.status(400).json({
            status:'failed',
            message:'Password is required'
        })
    }
    try {
        const staff = await Staff.findOne({_id:user.id})
        const hashPassword = await generatePassword(password)
        staff.password = hashPassword
        staff.save()
        res.status(200).json({
            status:'success',
            message:'Password successfully changed'
        })
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