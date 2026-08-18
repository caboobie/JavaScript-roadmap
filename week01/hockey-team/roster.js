function findPlayerByNumber(roster, number) {
    return roster.find(player =>
        player.seasons.some(season =>
            season.number === number
        )
    );
}

function addPlayerToRoster(roster, player) {
    const existingPlayer = findPlayerByNumber(roster, player.number);

    if (!existingPlayer) {
        roster.push(player);
        console.log(`Player ${player.name} added to the roster.`);
    } else {
        console.log(`Player with number ${player.number} already exists in the roster.`);
    }
}

function updatePlayerStats(roster, number, statsToAdd) {
    const player = findPlayerByNumber(roster, number);

    if (player) {
        player.goals += statsToAdd.goals ?? 0;
        player.assists += statsToAdd.assists ?? 0;
        player.penaltyMinutes += statsToAdd.penaltyMinutes ?? 0;
        console.log(`Updated stats for player ${player.name}.`);
    } else {
        console.log(`Player with number ${number} not found in the roster.`);
    }
}

function recordGameSheet(roster, gameStats) {
    for (const stat of gameStats) {
        updatePlayerStats(roster, stat.number, stat);
    }
}

function adjustPlayerSeasonStats(
    roster,
    number,
    season,
    goalsDifference,
    assistsDifference,
    penaltyMinutesDifference
) {
    const player = findPlayerByNumber(roster, number);

    if (!player) {
        console.log(
            `Player with number ${number} not found in roster.`
        );
        return false;
    }

    const playerSeason = player.seasons.find(
        playerSeason => playerSeason.season === season
    );

    if (!playerSeason) {
        console.log(
            `Season ${season} not found for ${player.name}.`
        );
        return false;
    }

    playerSeason.goals += goalsDifference;
    playerSeason.assists += assistsDifference;
    playerSeason.penaltyMinutes += penaltyMinutesDifference;

    return true;
}

module.exports = {
    findPlayerByNumber,
    addPlayerToRoster,
    updatePlayerStats,
    recordGameSheet,
    adjustPlayerSeasonStats
};
