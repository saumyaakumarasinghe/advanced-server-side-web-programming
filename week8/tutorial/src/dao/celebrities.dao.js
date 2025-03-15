const db = require("../database/connection");

const CelebrityDao = {
    getAllCelebritiesList: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT name FROM celebrities", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map((row) => row.name));
            });
        });
    },

    getCelebrityByName: (name) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM celebrities WHERE LOWER(name) = ?", [name.toLowerCase()], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    addCelebrity: (name, image, bio) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO celebrities (name, image, bio) VALUES (?, ?, ?)",
                [name, image, bio],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, name, image, bio });
                }
            );
        });
    }
};

module.exports = CelebrityDao;
