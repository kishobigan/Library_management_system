const express = require('express')

const {
    createMember,
    editMember,
    getAllMember,
    getMemberByEmail,
    getMemberById
} = require('../controllers/memberController')
const authToken = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/create-member", authToken, createMember)
router.put("/edit-member/:id", authToken, editMember)
router.get("/get-all-member", authToken, getAllMember)
router.get("/get-member-by-email", authToken, getMemberByEmail)
router.get("/get-member-by-id/:id", authToken, getMemberById)

module.exports = router;