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