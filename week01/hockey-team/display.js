function printDivider() {
    console.log('================================');
}

function printDividerShort() {
    console.log('-------------------------------');
}

function displayPlayerCard(player) {
    printDivider();

    console.log(`#${player.number} ${player.name}`);

    printDivider();

    console.log(`Position: ${player.position}`);
    console.log(`Team: ${player.team}`);

    console.log();

    console.log("STATS");
    printDividerShort();

    console.log(`Goals: ${player.goals}`);
    console.log(`Assists: ${player.assists}`);
    console.log(`Points: ${player.goals + player.assists}`);
    console.log(`Penalty Minutes: ${player.penaltyMinutes}`);

    console.log();

    console.log("SHARK FACT");
    printDividerShort();

    console.log(player.favouriteSharkFact);

    console.log();
}

function displayTeamStats(
    roster,
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
) {
    printDivider();

    console.log("TEAM STATS");

    printDivider();

    console.log(`players: ${roster.length}`);
    console.log(`goals: ${calculateTeamGoals(roster)}`);
    console.log(`assists: ${calculateTeamAssists(roster)}`);
    console.log(`points: ${calculateTeamPoints(roster)}`);
    console.log(`penalty minutes: ${calculateTeamPenaltyMinutes(roster)}`);

    const topScorer = findTopScorer(roster);

    console.log(`top scorer: ${topScorer.name} (#${topScorer.number}) with ${topScorer.goals} goals`);
}


module.exports = {
    printDivider,
    printDividerShort,
    displayPlayerCard,
    displayTeamStats
};

