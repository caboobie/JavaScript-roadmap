const fs = require("fs");

const FILE_PATH = "./data/games.json";

let games = [];

function loadGames() {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");

        games = JSON.parse(data);

        console.log(`${games.length} game(s) Loaded.`);
    } catch (err) {
        console.log("could not load games:", err.message);
        games = [];
    }
}

function saveGames() {
    try {
        fs.writeFileSync(
            FILE_PATH,
            JSON.stringify(games, null, 4)
        );
    } catch (error) {
        console.log("could not save games:", error.message);
    }
}

function addGame(game) {
    const existingGame = games.find(existingGame =>
        existingGame.opponent === game.opponent &&
        existingGame.date === game.date &&
        existingGame.location === game.location
    );

    if (existingGame) {
        console.log(
            `Game against ${game.opponent} on ${game.date} already exists.`
        );
        return false;
    }

    games.push(game);

    saveGames();
    console.log(
        `Game against ${game.opponent} on ${game.date} added successfully.`
    );
    return true;
}

loadGames();

module.exports = {
    games,
    addGame,
    loadGames,
    saveGames
};