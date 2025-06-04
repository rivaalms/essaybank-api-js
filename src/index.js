const express = require("express")
const api = require("./routes")

const app = express()
const port = 3080

app.use("/api", api)

app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})