const app = require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require('./db.js')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT ${process.env.port}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });