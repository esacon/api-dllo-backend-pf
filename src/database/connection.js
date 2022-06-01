const mongoose = require('mongoose');
require('colors');
require("dotenv").config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;

const connection = (db_name) => {
    const URI = `mongodb+srv://${username}:${password}@${db_url}/${db_name}?retryWrites=true&w=majority`;
    console.log(URI)
    return mongoose.connect(URI)
            .then(() => {
                console.log("\nBase de datos conectada con éxito.".yellow);
            })
            .catch((err) => {
                console.log("\nHa ocurrido un error al conectarse a la base de datos: ".red);
                console.log(err);
            });
};

module.exports = connection;
