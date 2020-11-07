const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT | 4000

//Middlewares
app.use(express.json())
app.use(cors());

/*
 *API Routes
*/
//Register/Login
app.use('/auth', require('./routes/auth'))
//Dashboard
app.use('/dashboard', require('./routes/dashboard'))

app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));