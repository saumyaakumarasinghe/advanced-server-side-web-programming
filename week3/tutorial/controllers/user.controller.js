const userService = require('../services/user.service');

const createUser = async (req, res) => {
    try {
        console.log(req.body);

        const user = await userService.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const users = await userService.getSingleUser(req.params);

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createUser, getUsers, getSingleUser, updateUser, deleteUser
}
