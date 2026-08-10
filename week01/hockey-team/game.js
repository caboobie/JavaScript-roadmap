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

function createGame(opponent, date, venue, ourScore, opponentScore) {
   
    let result;

    if (ourScore > opponentScore) {
        result = 'Win';
    } else if (ourScore < opponentScore) {
        result = 'Loss';
    } else {
        result = 'Draw';
    }
    return {
        opponent,
        date,
        venue,
        ourScore,
        opponentScore,
        result
    };
}


module.exports = { recordGame, createGame };

const testGame = createGame(
    "Billingham Blackhawks",
    "10/05/2026",
    "Billingham Forum",
    3,
    3
);

console.log(testGame);
