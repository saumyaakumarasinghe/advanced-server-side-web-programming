const UserDAO = require('../DAOs/UserDAO')//Import User Dao
const { generateHash, verify } = require('../Utilities/bcryptUtil')

class UserService {
    constructor() {
        this.userdao = new UserDAO()//We make an object of user dao to associate UserService with UserDao
    }

    async create(req) {
        try {
            req.body.password = await generateHash(req.body.password)
            const result = await this.userdao.create(req)
            return result
        } catch (ex) {
            console.error(ex)
        }
    }

    async authenticate(req) {
        try {
            const result = await this.userdao.getByEmail(req)
            if (!result) {
                return result
            }
            const isMatch = await verify(req.body.password, result.data.password)
            if (isMatch) {
                req.session.user = {
                    id: result.data.id,
                    email: result.data.email,
                    name: result.data.fn
                }
                req.session.isAuthenticated = true
            }
        } catch (ex) {

        }
    }

}
module.exports = UserService