const TEAM_NAME = "Whitley Bay Sharks";

function createPlayer(playerDetails) {
    return {
        name: playerDetails.name,
        number: playerDetails.number,
        position: playerDetails.position,
        team: playerDetails.team ?? TEAM_NAME,
        goals:playerDetails.goals ?? 0,
        assists:playerDetails.assists ?? 0,
        penaltyMinutes:playerDetails.penaltyMinutes ?? 0,
        favouriteSharkFact: playerDetails.favouriteSharkFact
    };   
}

module.exports = {
    createPlayer
};
