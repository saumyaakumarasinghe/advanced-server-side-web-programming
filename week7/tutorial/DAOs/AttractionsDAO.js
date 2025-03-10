const pool = require('../Database/SQLCon')


class AttractionsDAO {

    constructor() {

    }

    createResponse(success, data = null, error = null) {
        return {
            success,
            data,
            error: error?.message | error
        };
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            pool.all('select * from attractions', [], (err, rows) => {
                if (err) {
                    reject(err)
                }
                if (!rows) {
                    resolve(this.createResponse(false, "Nothing found", 'No attractions Found'))
                }
                resolve(this.createResponse(true, rows))
            })
        })
    }

    async create(req) {
        return new Promise((resolve, reject) => {
            pool.run('insert into attractions (name, location, desc) values (?, ?, ?)', [...Object.values(req.body)], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(this.createResponse(true, "Record Inserted"))
            })
        })



    }
}

module.exports = AttractionsDAO