const db = require("../database/connection");

const CelebrityDao = {
    getAllCelebrities: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT name FROM celebrities", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map((row) => row.name));
            });
        });
    },

    getCelebrityByName: (name) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM celebrities WHERE LOWER(name) = ?",
                [name.toLowerCase()],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
              }
          );
        });
    },

    addCelebrity: (name, image, bio, age, films) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO celebrities (name, image, bio, age, films) VALUES (?, ?, ?, ?, ?)",
                [name, image, bio, age, JSON.stringify(films)],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, name, image, bio, age, films });
                }
            );
        });
    }
};

module.exports = CelebrityDao;
