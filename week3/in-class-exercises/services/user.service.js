const createUser = async (userData) => {
    return userData
}

const getUsers = async () => {
    return "calling from getUsers service"
}

const getSingleUser = async (userId) => {
    return `user id = ${userId}`
}

const updateUser = async (userId) => {
    return `updated user id = ${userId}`
}

const deleteUser = async (userId) => {
    return `deleted user id = ${userId}`
}

module.exports = {
    createUser, getUsers, getSingleUser, updateUser, deleteUser
}