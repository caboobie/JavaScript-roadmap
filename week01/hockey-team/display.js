function printDivider() {
    console.log('================================');
}

function printDividerShort() {
    console.log('-------------------------------');
}

function displayPlayerCard(player) {
    const currentSeason = player.seasons[0];

    printDivider();

    console.log(`#${currentSeason.number} ${player.name}`);

    printDivider();

    console.log(`Position: ${currentSeason.position}`);
    console.log(`Team: ${player.team}`);

    console.log();
}

function displayTeamStats(
    roster,
    season,
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
) {
    printDivider();

    console.log(`Team Stats for Season ${season}`);

    printDivider();

    console.log(`players: ${roster.length}`);
    console.log(`goals: ${calculateTeamGoals(roster, season)}`);
    console.log(`assists: ${calculateTeamAssists(roster, season)}`);
    console.log(`points: ${calculateTeamPoints(roster, season)}`);
    console.log(`penalty minutes: ${calculateTeamPenaltyMinutes(roster, season)}`);

    const topScorer = findTopScorer(roster, season);

    if (topScorer) {
        const playerSeason = topScorer.seasons.find(
            playerSeason => playerSeason.season === season
        );

        console.log(
            `Top Scorer: ${topScorer.name} (#${playerSeason.number}) with ${playerSeason.goals} goals`
        );
    } else {
        console.log("No top scorer found for this season.");
    }
}

module.exports = {
    printDivider,
    printDividerShort,
    displayPlayerCard,
    displayTeamStats
};