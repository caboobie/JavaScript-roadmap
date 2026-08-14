function getPlayerSeason(player, season) {
    return player.seasons.find(
        playerSeason => playerSeason.season === season
    );
}

function calculatePlayerPoints(player, season) {
    const playerSeason = getPlayerSeason(player, season);

    if (!playerSeason) {
        return 0;
    }

    return playerSeason.goals + playerSeason.assists;
}


function calculateTeamGoals(roster, season) {
    let totalGoals = 0;

    for (const player of roster) {
        const playerSeason = getPlayerSeason(player, season);

        if (playerSeason) {
            totalGoals += playerSeason.goals;
        }
    }

    return totalGoals;
}


function calculateTeamAssists(roster, season) {
    let totalAssists = 0;

    for (const player of roster) {
        const playerSeason = getPlayerSeason(player, season);

        if (playerSeason) {
            totalAssists += playerSeason.assists;
        }
    }

    return totalAssists;
}


function calculateTeamPoints(roster, season) {
    let totalPoints = 0;

    for (const player of roster) {
        totalPoints += calculatePlayerPoints(player, season);
    }

    return totalPoints;
}


function calculateTeamPenaltyMinutes(roster, season) {
    let totalPenaltyMinutes = 0;

    for (const player of roster) {
        const playerSeason = getPlayerSeason(player, season);

        if (playerSeason) {
            totalPenaltyMinutes += playerSeason.penaltyMinutes;
        }
    }

    return totalPenaltyMinutes;
}


function findTopScorer(roster, season) {
    let topScorer = null;
    let highestGoals = -1;

    for (const player of roster) {
        const playerSeason = getPlayerSeason(player, season);

        if (playerSeason && playerSeason.goals > highestGoals) {
            topScorer = player;
            highestGoals = playerSeason.goals;
        }
    }

    return topScorer;
}


module.exports = {
    getPlayerSeason,
    calculatePlayerPoints,
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
};