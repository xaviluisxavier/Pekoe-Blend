const mysql = require('mysql2');

require('dotenv').config({ path: './public/private/.env' })

const connection = mysql.createConnection({
  host: process.env._HOST,
  user: process.env._USERNAME,
  password: process.env._PASSWORD,
  database: process.env._DATABASE,
  port: process.env._PORT
})

module.exports = connection;



