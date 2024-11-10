const express = require("express"); 
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./database/connection/dbConnect");

const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000; 

const path = require("path");
const _dirname = path.dirname("");
const buildpath = path.join(__dirname, "../workout-tracker/dist");
app.use(express.static(buildpath));
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../workout-tracker/dist', 'index.html')));

dbConnect();

app.use("/", require("./routes/router"));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});