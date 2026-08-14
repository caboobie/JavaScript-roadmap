function createSeasonPlayer(season, number, position) {
    return {
        season,
        number,
        position,
        goals: 0,
        assists: 0,
        penaltyMinutes: 0
    };
}

module.exports = {
    createSeasonPlayer
};