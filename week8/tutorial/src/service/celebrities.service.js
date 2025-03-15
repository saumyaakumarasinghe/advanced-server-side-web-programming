// Sample celebrity data
const celebrities = [
    { name: "Leonardo DiCaprio", image: "https://example.com/leonardo.jpg", bio: "Actor known for Titanic, Inception." },
    { name: "Scarlett Johansson", image: "https://example.com/scarlett.jpg", bio: "Actress known for Black Widow, Lost in Translation." },
    { name: "Cristiano Ronaldo", image: "https://example.com/ronaldo.jpg", bio: "Footballer, five-time Ballon d'Or winner." },
];

async function celebritiesList(req, res) {
    try {
        res.json(celebrities.map((c) => c.name)); // Send only names for dropdown
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function celebritySearch(req, res) {
    try {
        const query = req.query.name.toLowerCase();
        const celebrity = celebrities.find((c) => c.name.toLowerCase() === query);

        if (celebrity) {
            res.json(celebrity);
        } else {
            res.status(404).json({ error: "Celebrity not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { celebritiesList, celebritySearch };
