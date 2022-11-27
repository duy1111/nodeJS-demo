// get the client
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'nodejsbasic',
});
// simple query
// connection.query(
//   'SELECT * FROM `user` ',
//   function(err, results, fields) {
//     console.log("check mysql")
//     console.log(results); // results contains rows returned by server

//   }
// );

export default pool;
