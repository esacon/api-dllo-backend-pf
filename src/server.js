const express = require('express');
const app = express();
const db_connection = require('./database/connection');
require('colors');

require("dotenv").config();
console.log(process.env.PORT)
console.log(process.env.DB_NAME)
// Settings
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Rutas
app.use('/users', require('./routes/users.routes'));
app.use('/posts', require('./routes/posts.routes'));
//app.use('/follows', require('./routes/follows.routes'));
console.log('holaa')

// Arrancamos el servidor
// http://localhost:5000
app.listen(PORT, async function () {
    console.log(`\nServidor iniciado en el puerto ${PORT}.`.green);
    const connection = await db_connection(process.env.DB_NAME);
});
