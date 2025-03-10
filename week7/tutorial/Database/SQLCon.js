const Database = require('sqlite3')
const pool = new Database.Database('./attractions.db', () => {
  verbose: console.log
})


/*const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    host: "localhost",
    user: "eventsuser2",
    password: "abc123",
    database: "eventsdb",
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0
})

async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('✅ MySQL Connected Successfully!');
      connection.release(); // Release connection back to the pool
    } catch (error) {
      console.error('❌ MySQL Connection Failed:', error);
      process.exit(1); // Exit process if connection fails
    }
  }

 // testConnection()
*/
module.exports = pool