const AttractionsDAO = require('../DAOs/AttractionsDAO')//Import DAO

class AttractionsService {
    constructor() {
        this.attractionsdao = new AttractionsDAO()//Declare Object of DAO
    }
    async getAll() { //Functions should Map to DAO functions 
        try {
            const results = await this.attractionsdao.getAll()
            if (results.error === 'No Users Found') {
                return results.error
            }
            else {
                return results.data
            }
        }
        catch (ex) {
            console.error(ex)
        }
    }
    async create(req) {
        try {
            const result = await this.attractionsdao.create(req)
            return result
        }
        catch (ex) {
            console.error(ex)
        }
    }
}
module.exports = AttractionsService