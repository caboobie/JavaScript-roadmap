const { updatePlayerStats, findPlayerByNumber } = require('./roster');
const { roster } = require('./players');
const { games } = require('./games');

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
    const game = {
        opponent,
        date,
        venue,
        ourScore,
        opponentScore,
        result
    };

    games.push(game);

    return game;
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
console.log(games);

