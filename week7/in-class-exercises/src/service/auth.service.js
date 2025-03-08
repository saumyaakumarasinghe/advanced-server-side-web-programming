const { verifyPassword } = require('../service/bcrypt.service')
const userDao = require('../dao/user.dao');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const foundUser = await userDao.getUserByEmail(email);
        console.log(foundUser);
        if (!foundUser) return res.status(404).json({ message: 'User email is not exist' });

        console.log(foundUser.password);
        const passwordMatch = await verifyPassword(password, foundUser.password);
        if (passwordMatch) return res.status(404).json({
            message: 'Password does not match'
        });

        res.json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login
}