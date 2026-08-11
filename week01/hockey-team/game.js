const { updatePlayerStats, findPlayerByNumber } = require('./roster');
const { roster } = require('./players');
const { games, addGame } = require('./games');

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

function createGame(opponent, date, venue, ourScore, opponentScore, playerStats) {
   
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
        result,
        playerStats
    };

    addGame(game); // Call the addGame function to add the game to the games array

    return game;
}


module.exports = { recordGame, createGame };