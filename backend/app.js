const express = require("express"); 
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./database/connection/dbConnect");

const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000; 

dbConnect();

app.use("/", require("./routes/router"));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});