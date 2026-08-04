const { updatePlayerStats, findPlayerByNumber } = require('./roster');
const { roster } = require('./players');

function recordGame(roster,gameSheet) {
    for (const gameStats of gameSheet) {
        const player = findPlayerByNumber(roster, gameStats.number);
        if (player) {
            updatePlayerStats(roster, player.number, gameStats);
        } else {
            console.log(`Player with number ${gameStats.number} not found in the roster.`);
        }
    }
}


module.exports = { recordGame };