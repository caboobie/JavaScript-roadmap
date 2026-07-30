function calculatePlayerPoints(player) {
    return player.goals + player.assists;
}

function calculateTeamGoals(roster) {
    let totalGoals = 0;

    for (const player of roster) {
        totalGoals += player.goals;
    }

    return totalGoals;
}

function calculateTeamAssists(roster) {
    let totalAssists = 0;

    for (const player of roster) {
        totalAssists += player.assists;
    }

    return totalAssists;
}

function calculateTeamPoints(roster) {
    let totalPoints = 0;

    for (const player of roster) {
        totalPoints += calculatePlayerPoints(player);
    }

    return totalPoints;
}

function calculateTeamPenaltyMinutes(roster) {
    let totalPenaltyMinutes = 0;

    for (const player of roster) {
        totalPenaltyMinutes += player.penaltyMinutes;
    }

    return totalPenaltyMinutes;
}

function findTopScorer(roster) {
    let topScorer = roster[0];

    for (const player of roster) {
        if (player.goals > topScorer.goals) {
            topScorer = player;
        }
    }

    return topScorer;
}

module.exports = {
    calculatePlayerPoints,
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
};
