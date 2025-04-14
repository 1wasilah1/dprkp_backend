const User = require('../models/UserModel'); // MongoDB
const { getDBClient } = require('../config/database');
const dbType = process.env.DB_TYPE;

exports.getUsers = async () => {
  if (dbType === 'mongodb') {
    return await User.find().select('-password');
  } else {
    const conn = getDBClient();
    const result = await conn.execute(`SELECT id, name, position, role FROM users`);
    return result.rows.map(([id, name, position, role]) => ({ id, name, position, role }));
  }
};

exports.getUserById = async (id) => {
  if (dbType === 'mongodb') {
    return await User.findById(id).select('-password');
  } else {
    const conn = getDBClient();
    const result = await conn.execute(`SELECT id, name, position, role FROM users WHERE id = :id`, [id]);
    if (result.rows.length === 0) return null;
    const [user] = result.rows;
    return { id: user[0], name: user[1], position: user[2], role: user[3] };
  }
};

exports.createUser = async (data) => {
  if (dbType === 'mongodb') {
    const newUser = new User(data);
    return await newUser.save();
  } else {
    const conn = getDBClient();
    await conn.execute(
      `INSERT INTO users (name, position, password, role) VALUES (:name, :position, :password, :role)`,
      data
    );
    await conn.commit();
    return data; // Return original data
  }
};

exports.updateUser = async (id, data) => {
  if (dbType === 'mongodb') {
    const updated = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
    return updated;
  } else {
    const conn = getDBClient();
    const fields = [];
    const values = [];
    for (const key in data) {
      fields.push(`${key} = :${key}`);
      values.push(data[key]);
    }
    values.push(id);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = :id`;
    const result = await conn.execute(sql, values);
    await conn.commit();
    return result.rowsAffected > 0 ? { id, ...data } : null;
  }
};

exports.deleteUser = async (id) => {
  if (dbType === 'mongodb') {
    const deleted = await User.findByIdAndDelete(id);
    return !!deleted;
  } else {
    const conn = getDBClient();
    const result = await conn.execute(`DELETE FROM users WHERE id = :id`, [id]);
    await conn.commit();
    return result.rowsAffected > 0;
  }
};
