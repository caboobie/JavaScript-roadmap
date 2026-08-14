const TEAM_NAME = "Whitley Bay Sharks";

function createPlayer(playerDetails) {
    return {
        name: playerDetails.name,
        team: playerDetails.team ?? TEAM_NAME,
        favouriteSharkFact: playerDetails.favouriteSharkFact,
        seasons: []
    };
}

function createSeasonPlayer(seasonDetails) {
    return {
        season: seasonDetails.season,
        number: seasonDetails.number,
        position: seasonDetails.position,
        Goals: seasonDetails.goals ?? 0,
        Assists: seasonDetails.assists ?? 0,
        PenaltyMinutes: seasonDetails.penaltyMinutes ?? 0
    };
}

module.exports = {
    createPlayer,
    createSeasonPlayer
};
