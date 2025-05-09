const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("Oracle DB Pool created");
  } catch (error) {
    console.error("Oracle init error:", error);
  }
}

async function getConnection() {
  try {
    console.log('masuk connection')
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Oracle DB Connected");
    return connection;
  } catch (error) {
    console.error("❌ Oracle DB Connection Error:", error);
    throw error;
  }
}

module.exports = { initialize, getConnection };