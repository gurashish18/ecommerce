const app = require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require('./db.js')

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT ${process.env.port}`)
})