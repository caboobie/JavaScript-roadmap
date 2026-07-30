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

function displayTeamStats(roster) {
    printDivider();

    console.log("TEAM STATS");

    printDivider();

    console.log(`players: ${roster.length}`);
}


module.exports = {
    printDivider,
    printDividerShort,
    displayPlayerCard,
    displayTeamStats
};

