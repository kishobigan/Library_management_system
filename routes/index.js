const express = require('express')

const staffRoutes = require('../routes/staffRoutes')
const memberRoutes = require('../routes/memberRoutes')
const bookRoutes = require('./bookRoutes')

const router = express.Router()

router.use('/staff', staffRoutes)
router.use('/member', memberRoutes)
router.use('/book', bookRoutes)


module.exports = router