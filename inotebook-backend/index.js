const connectToMongoose=require('./db');
var cors = require('cors')
const express = require('express')
connectToMongoose();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());


//Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})