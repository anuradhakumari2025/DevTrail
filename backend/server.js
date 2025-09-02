require("dotenv").config()
const app = require("./src/app")
const connectionToDB = require("./src/db/db")

connectionToDB()

app.listen(process.env.PORT,()=>{
  console.log(`Server is running at ${process.env.PORT}`)
})