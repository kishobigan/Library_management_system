require('dotenv').config();
const app = require('./app')
const connectTODatabase = require('./config/dbConfig')

const PORT = process.env.PORT || 5001

connectTODatabase()


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})