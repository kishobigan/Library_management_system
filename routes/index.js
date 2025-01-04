const express = require('express')

const staffRoutes = require('../routes/staffRoutes')
const memberRoutes = require('../routes/memberRoutes')

const router = express.Router()

router.use('/staff', staffRoutes)
router.use('/member', memberRoutes)


module.exports = router