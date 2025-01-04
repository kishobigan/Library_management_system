const Member = require('../models/Member')

const createMember = async (req, res) => {
    const {name, email, phone, address, membershipType } = req.body
    const staff = req.user
    if(!name || !email || !phone || !address || !membershipType){
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
    const id = req.params.id;
    const { name, email, phone, address, membershipType, renewal } = req.body;
    const staff = req.user;
    console.log(req.body);

    if (!name || !email || !phone || !address || !membershipType) {
        return res.status(400).json({
            status: 'failed',
            message: 'Name, email, phone, address, renewal, and membership type are required'
        });
    }

    if (staff.role !== 'staff') {
        return res.status(401).json({
            status: 'failed',
            message: 'Only staff can create member'
        });
    }

    let membershipEndDate;
    if (renewal) {
        const membershipStartDate = new Date();
        membershipEndDate = new Date(membershipStartDate);
        membershipEndDate.setFullYear(membershipEndDate.getFullYear() + 1);
    }

    try {
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
        
        const member = await Member.findByIdAndUpdate(id, updateData, { new: true });

        if (!member) {
            return res.status(400).json({
                status: 'failed',
                message: 'Member edit failed'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Member edited successfully',
            data: member
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong'
        });
    }
};


const getAllMember = async (req, res) => {
    const staff = req.user

    if(staff.role != 'staff'){
        res.status(401).json({
            status:'failed',
            message: 'Only staff can create member'
        })
    }

    try{
        const members = await Member.find().populate('membershipType')
        res.status(200).json({
            status:'success',
            message:members
        })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'Something went wrong'
        })
    }
    res.status(200).json({
        status:'success',
        message:'Member edited successfully'
    })
}

const getMemberById = async (req, res) => {
    const id = req.params.id;

    const staff = req.user
    
    if(staff.role != 'staff'){
        res.status(401).json({
            status:'failed',
            message: 'Only staff can create member'
        })
    }


    try {
        const member = await Member.findById(id).populate('membershipType')
        if(!member){
            res.status(400).json({
                status:'failed',
                message:'Cannot find member by this id'
            })
        }
        res.status(200).json({
            status:'success',
            message:member
        })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'Something Went wrong'
        })
    }
    
}

const getMemberByEmail = async (req, res) => {
    const {email} = req.body

    const staff = req.user
    
    if(staff.role != 'staff'){
        res.status(401).json({
            status:'failed',
            message: 'Only staff can create member'
        })
    }

    try {
        const member = await Member.findOne({email:email})
        if(!member){
            res.status(400).json({
                status:'failed',
                message:'No members associated with this email'
            })
        }

        res.status(200).json({
            status:'success',
            message: member
        })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'Something went wrong'
        })
    }
}

module.exports = {
    createMember,
    editMember,
    getAllMember,
    getMemberByEmail,
    getMemberById
}