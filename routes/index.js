const express = require('express')

const staffRoutes = require('../routes/staffRoutes')

const router = express.Router()

router.use('/staff', staffRoutes)


module.exports = router