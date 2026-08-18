const TEAM_NAME = "Whitley Bay Sharks";

function createPlayer(playerDetails) {
    return {
        name: playerDetails.name,
        team: playerDetails.team ?? TEAM_NAME,
        seasons: []
    };
}

function createSeasonPlayer(seasonDetails) {
    return {
        season: seasonDetails.season,
        number: seasonDetails.number,
        position: seasonDetails.position,
        goals: seasonDetails.goals ?? 0,
        assists: seasonDetails.assists ?? 0,
        penaltyMinutes: seasonDetails.penaltyMinutes ?? 0
    };
}

module.exports = {
    createPlayer,
    createSeasonPlayer
};
