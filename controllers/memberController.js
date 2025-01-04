const Member = require('../models/Member')

const createMember = async (req, res) => {
    const {name, email, phone, address, membershipType } = req.body
    const staff = req.user
    if(!name, !email, !phone, !address, !membershipType){
        res.status(400).json({
            status:'failed',
            message: 'Name, email, phone, address and membership type are required'
        })
    }

    if(staff.role != 'staff'){
        res.status(401).json({
            status:'failed',
            message: 'Only staff can create member'
        })
    }

    try{
        const membershipStartDate = new Date()
        const membershipEndDate = new Date(membershipStartDate);
        membershipEndDate.setFullYear(membershipEndDate.getFullYear() + 1);

        const member = await Member.create({
            name,
            email,
            phone,
            address,
            membershipType,
            membershipStartDate,
            membershipEndDate,
        })
        res.status(201).json({
            status:'success',
            message: 'Member '+member.name+' created successfully',
        })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'something went wrong'
        })
    }
}

const editMember = async (req, res) => {
    const id = req.params.id
    const {name, email, phone, address, membershipType, renewal } = req.body
    const staff = req.user

    if(!name, !email, !phone, !address, !membershipType, !renewal){
        res.status(400).json({
            status:'failed',
            message: 'Name, email, phone, address and membership type are required'
        })
    }

    if(staff.role != 'staff'){
        res.status(401).json({
            status:'failed',
            message: 'Only staff can create member'
        })
    }

    if(renewal){
        const membershipStartDate = new Date()
        const membershipEndDate = new Date(membershipStartDate);
        membershipEndDate.setFullYear(membershipEndDate.getFullYear() + 1);
    }

    try{
        const updateData = {
            name,
            email,
            phone,
            address,
            membershipType
        };

        if (renewal) {
            updateData.membershipEndDate = membershipEndDate;
        }
        const member = await Member.findByIdAndUpdate(id, updateData, {new: true})

        if(!member){
            res.json(400).status({
                status:'failed',
                message:'Member edited failed'
            })
        }

        res.json(200).status({
            status:'failed',
            message:'Member edited successfully'
        })
    }catch(error){
        res.json(400).status({
            status:'failed',
            message:'Something went wrong'
        })
    }
    
}

const getAllMember = async (req, res) => {
    try{
        const members = await Member.find().populate('membershipType')
        res.json(200).status({
            status:'success',
            message:members
        })
    }catch(error){
        res.json(400).status({
            status:'failed',
            message:'Something went wrong'
        })
    }
    res.json(200).status({
        status:'success',
        message:'Member edited successfully'
    })
}

const getMemberByEmail = async (req, res) => {
    res.json(200).status({
        status:'success',
        message:'Member edited successfully'
    })
}

module.exports = {
    createMember,
    editMember,
    getAllMember,
    getMemberByEmail
}