// database operations

const db = require('../config/database');

async function getAllUsers() {
    try {
        const [rows] = await db.query('SELECT * FROM `advanced-server-side`.user');
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getUserById(id) {
    try {
        const [rows] = await db.query('SELECT * FROM `advanced-server-side`.user WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createUser(name, email) {
    try {
        const [result] = await db.query('INSERT INTO `advanced-server-side`.user (name, email) VALUES (?, ?)', [name, email]);
        return { id: result.insertId, name, email };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateUser(id, name, email) {
    try {
        const [result] = await db.query(
            'UPDATE `advanced-server-side`.user SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteUser(id) {
    try {
        const [result] = await db.query('DELETE FROM `advanced-server-side`.user WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
