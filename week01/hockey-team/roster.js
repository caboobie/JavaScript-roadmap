function findPlayerByNumber(roster, number) {
    for (const player of roster) {
        if (player.number === number) {
            return player;
        }
    }
    return null; // Return null if no player is found with the given number
}

function addPlayerToRoster(roster, player) {
    const existingPlayer = findPlayerByNumber(roster, player.number);

    if (existingPlayer) {
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

module.exports = {
    findPlayerByNumber,
    addPlayerToRoster,
    updatePlayerStats,
    recordGameSheet
};
