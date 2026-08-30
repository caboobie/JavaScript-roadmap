const { findPlayerByNumber } = require('./roster');
const { addGame } = require('./games');
const { CURRENT_SEASON } = require('./config');
const { printDivider, printDividerShort } = require('./display');

function recordGame(
    roster,
    gameSheet,
    season
) {

    for (const gameStats of gameSheet) {

        const player = findPlayerByNumber(
            roster,
            gameStats.number
        );

        if (player) {

            const playerSeason = player.seasons.find(
                playerSeason =>
                    playerSeason.season === season
            );

            if (playerSeason) {

                console.log();
                playerSeason.goals += gameStats.goals;
                playerSeason.assists += gameStats.assists;
                playerSeason.penaltyMinutes += gameStats.penaltyMinutes;
                console.log();

            } else {

                console.log(
                    `Season ${season} not found for ${player.name}.`
                );
            }

        } else {

            console.log(
                `Player with number ${gameStats.number} not found in the roster.`
            );
        }
    }
}

function createGame(
    opponent,
    location,
    date,
    venue,
    ourScore,
    opponentScore,
    playerStats
) {
   
    let result;

    if (ourScore > opponentScore) {
        result = 'Win';
    } else if (ourScore < opponentScore) {
        result = 'Loss';
    } else {
        result = 'Draw';
    }
    const game = {
        season: CURRENT_SEASON,
        opponent,
        location,
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