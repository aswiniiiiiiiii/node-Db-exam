require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./database/dbConnection');

const userDetailServer = express();


userDetailServer.use(cors());
userDetailServer.use(express.json());
userDetailServer.use(router);

const PORT = 3001 || process.env.PORT;

userDetailServer.listen(PORT, () => {
    console.log(`userDetailServer started at port ${PORT} and waiting for response!`);
});

userDetailServer.get('/', (req, res) => {
    res.status(200).send('<h1 style="color:red">userDetailServer started at port and waiting for client request!</h1>');
});
