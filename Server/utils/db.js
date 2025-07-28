// const mysql2 = require("mysql2")
// import mysql2 from 'mysql2'
// import dotenv from "dotenv";
// dotenv.config();



// const connection = mysql2.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME
// });
// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err.message);
//     } else {
//       console.log('Connected to the database');
//     }
//   });

//   export default connection;







import mysql2 from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error(" Error connecting to the database:", err.message);
  } else {
    console.log("Successfully connected to the MySQL database.");
    connection.release(); 
  }
});

export default pool.promise(); 
