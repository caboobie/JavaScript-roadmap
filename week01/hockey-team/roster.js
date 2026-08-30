function findPlayerByNumber(roster, number) {
    return roster.find(player =>
        player.seasons.some(season =>
            season.number === number
        )
    );
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
    adjustPlayerSeasonStats
};
