const express = require("express")
const morgan = require("morgan")




const app = express()


//middlewares
if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}


//database config
require("./config/db")()

//endpoints
app.get("/", (req, res)=> {
    res.send("api is running")
})

app.use("/api/users", require("./routes/api/users"))
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/auth", require("./routes/api/auth"))

const port = process.env.Port || 5000

app.listen(port, ()=> console.log(`server is running on port ${port}`))