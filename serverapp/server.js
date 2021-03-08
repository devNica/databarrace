const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const PORT = 5200;

const app = express();

app.use(cors({origin: `http://localhost:3000`}))
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require("./routes/index");
app.use("/api", indexRouter);

app.use((req, res)=>{
    res.json({success: false, message: `Page Not Found`})
});

app.listen(PORT, ()=>console.log(`Server is running on port: ${PORT}`))
