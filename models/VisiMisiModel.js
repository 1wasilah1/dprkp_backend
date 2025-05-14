const oracledb = require("oracledb");
const db = require("../config/connectionOracle");

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
};

const rowsLabelToLowercase = (rows) => {
  return rows.map((row) => {
    const newRow = {};
    for (let key in row) {
      newRow[key.toLowerCase()] = row[key];
    }
    return newRow;
  });
};

async function getAllVisiMisi() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    oracledb.fetchAsString = [oracledb.CLOB];
    const result = await connection.execute(
      `SELECT * FROM WEBSITE_VISI_MISI`,
      [],
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );
    if (result && result.rows.length > 0) {
      return rowsLabelToLowercase(result.rows);
    }
    return result.rows;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database error",
      oracleError: err.message,
      code: err.errorNum, // Misalnya: 942
      offset: err.offset, // Posisi karakter error (jika tersedia)
    });
  }
}

async function getVisiMisiByType(type) {
  try {
    //type 1 untuk profile page
    //type 2 untuk ppid page
    const connection = await oracledb.getConnection(dbConfig);
    oracledb.fetchAsString = [oracledb.CLOB];
    const result = await connection.execute(
      `SELECT * FROM WEBSITE_VISI_MISI WHERE TYPE_VISI_MISI = :type`,
      [type],
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );

    if (result && result.rows.length > 0) {
      return rowsLabelToLowercase(result.rows);
    }
    return result.rows;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database error",
      oracleError: err.message,
      code: err.errorNum, // Misalnya: 942
      offset: err.offset, // Posisi karakter error (jika tersedia)
    });
  }
}

async function createVisiMisi(data) {
  const connection = await oracledb.getConnection(dbConfig);
  try {
    const {
      visi,
      misi,
      visi_image,
      misi_image,
      type_visi_misi,
      visi_misi_banner,
    } = data;
    const result = await connection.execute(
      "INSERT INTO WEBSITE_VISI_MISI (visi, misi, visi_image, misi_image, type_visi_misi, visi_misi_banner) VALUES (:visi, :misi, :visi_image, :misi_image, :type_visi_misi, :visi_misi_banner)",
      { visi, misi, visi_image, misi_image, type_visi_misi, visi_misi_banner },
      { autoCommit: true }
    );
    console.log("result=>", result);
    return result;
  } catch (err) {
    console.error("Error create visi misi", err);
    throw err;
  }
}

async function updateVisiMisi(id, data) {
  try {
    const {
      visi,
      misi,
      visi_image,
      misi_image,
      type_visi_misi,
      visi_misi_banner,
    } = data;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "UPDATE WEBSITE_VISI_MISI SET visi = :visi, misi = :misi, visi_image = :visi_image, misi_image = :misi_image, type_visi_misi = :type_visi_misi, visi_misi_banner = :visi_misi_banner WHERE id = :id",
      {
        id,
        visi,
        misi,
        visi_image,
        misi_image,
        type_visi_misi,
        visi_misi_banner,
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (err) {
    console.error("Error edit visi misi", err);
    throw err;
  }
}

async function deleteVisiMisi(id) {
  let connection;

  try {
    connection = await db.getConnection();
    await connection.execute(
      `DELETE FROM WEBSITE_VISI_MISI WHERE ID = :id`,
      { id: id },
      { autoCommit: true } // Commit langsung setelah DELETE
    );
    return result.autoCommit;
  } catch (err) {
    console.error("Error truncating table:", err);
    throw err;
  }
}

async function create ({
  visi,
  misi,
  visi_image,
  misi_image,
  type_visi_misi,
  visi_misi_banner,
}) {
  await db.query(
    `INSERT INTO WEBSITE_VISI_MISI (visi, misi, visi_image, misi_image, type_visi_misi, visi_misi_banner)
       VALUES (:visi, :misi, :visi_image, :misi_image, :type_visi_misi, :visi_misi_banner)`,
    { visi, misi, visi_image, misi_image, type_visi_misi, visi_misi_banner },
    { autoCommit: true }
  );
}

module.exports = {
  getAllVisiMisi,
  getVisiMisiByType,
  createVisiMisi,
  updateVisiMisi,
  deleteVisiMisi,
  create
};
