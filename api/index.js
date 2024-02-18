const express = require("express");
const cors = require("cors")

const app = express();
const port = 2001

app.use(express.json())
app.use(cors())
// app.options('*', cors());
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/auth', require('./routes/auth') )
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log("connected")
})