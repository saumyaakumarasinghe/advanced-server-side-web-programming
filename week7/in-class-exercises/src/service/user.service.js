// business logic 
const { generateHash } = require('../service/bcrypt.service')
const userDao = require('../dao/user.dao');

async function getUsers(req, res) {
    try {
        const users = await userDao.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const user = await userDao.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!password || !email) return res.status(400).json({ message: 'Password and Email are required' });

        const hashedPassword = await generateHash(password);

        const newUser = await userDao.createUser(name, email, hashedPassword);

        console.log(hashedPassword);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email are required' });
        }

        const success = await userDao.updateUser(id, name, email);
        if (!success) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const success = await userDao.deleteUser(id);

        if (!success) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
