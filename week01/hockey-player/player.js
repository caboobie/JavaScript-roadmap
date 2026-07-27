const alexPickering = {
    name: "Alexander Pickering",
    number: 90,
    position: "Defence",
    team: "Whitley Bay Sharks",
    goals: 0,
    assists: 1,
    penaltyMinutes: 8,
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
};

const nathanMilne = {
    name: "Nathan Milne",
    number: 21,
    position: "Centre",
    team: "Whitley Bay Sharks",
    goals: 5,
    assists: 8,
    penaltyMinutes: 0,
    favouriteSharkFact: "Sharks have existed longer than trees"
};

const abbieStephenson = {
    name: "Abbie Stephenson",
    number: 24,
    position: "Left Winger",
    team: "Whitley Bay Sharks",
    goals: 7,
    assists: 4,
    penaltyMinutes: 6,
    favouriteSharkFact: "Some sharks can replace their teeth thousands of times"
};

const roster = [
    alexPickering,
    nathanMilne,
    abbieStephenson
];


function displayPlayerCard(player) {
    console.log(`Player: ${player.name}`);
    console.log(`Number: ${player.number}`);
    console.log(`Position: ${player.position}`);
    console.log(`Team: ${player.team}`);
    console.log(`Goals: ${player.goals}`);
    console.log(`Assists: ${player.assists}`);
    console.log(`Points: ${calculatePlayerPoints(player)}`);
    console.log(`Penalty Minutes: ${player.penaltyMinutes}`);
    console.log(`Fact: ${player.favouriteSharkFact}`);
    console.log();
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

function findTopScorer(roster) {
    let topScorer = roster[0];

    for (const player of roster) {
        if (player.goals > topScorer.goals) {
            topScorer = player;

        }
    }

    return topScorer;
}

function calculatePlayerPoints(player) {
    return player.goals + player.assists;
}





roster.forEach(displayPlayerCard);

const teamGoals = calculateTeamGoals(roster);
const teamAssists = calculateTeamAssists(roster);
const highestScorer = findTopScorer(roster);


console.log(`Total team goals this season: ${teamGoals}`);
console.log(`Total team assists this season ${teamAssists}`);
console.log(`The top scorer this season is: ${highestScorer.name} with ${highestScorer.goals} goals`);

