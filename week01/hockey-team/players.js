const fs = require("fs");

const FILE_PATH = "./data/players.json";

let roster = [];



function loadPlayers() {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");

        roster = JSON.parse(data);

        console.log(`${roster.length} player(s) loaded.`);
    } catch (error) {
        console.log("could not load players:", error.message);
        roster = [];
    }
}

function savePlayers(playersToSave = roster) {
    try {
        fs.writeFileSync(
            FILE_PATH,
            JSON.stringify(playersToSave, null, 4)
        );

        console.log("Players saved.");
    } catch (error) {
        console.log("Could not save players:", error.message);
    }
}

loadPlayers();

module.exports = {
    roster,
    loadPlayers,
    savePlayers
};