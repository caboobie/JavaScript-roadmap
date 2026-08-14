const TEAM_NAME = "Whitley Bay Sharks";

function createPlayer(playerDetails) {
    return {
        name: playerDetails.name,
        number: playerDetails.number,
        position: playerDetails.position,
        team: playerDetails.team ?? TEAM_NAME,
        goals: playerDetails.goals ?? 0,
        assists: playerDetails.assists ?? 0,
        penaltyMinutes: playerDetails.penaltyMinutes ?? 0,
        favouriteSharkFact: playerDetails.favouriteSharkFact
    };
}



const alexPickering = createPlayer({
    name: "Alexander Pickering",
    number: 90,
    position: "Defence",
    team: TEAM_NAME,
    goals: 0,
    assists: 1,
    penaltyMinutes: 8,
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
});

const nathanMilne = createPlayer({
    name: "Nathan Milne",
    number: 21,
    position: "Centre",
    team: TEAM_NAME,
    goals: 5,
    assists: 8,
    penaltyMinutes: 0,
    favouriteSharkFact: "Sharks have existed longer than trees"
});

const abbieStephenson = createPlayer({
    name: "Abbie Stephenson",
    number: 24,
    position: "Left Winger",
    team: TEAM_NAME,
    goals: 7,
    assists: 4,
    penaltyMinutes: 6,
    favouriteSharkFact: "Some sharks can replace their teeth thousands of times"
});

const chloeStephenson = createPlayer({
    name: "Chloe Stephenson",
    number: 12,
    position: "Right Winger",
    team: TEAM_NAME,
    favouriteSharkFact: "Sharks have been around longer than dinosaurs"
});

const scottBrown = createPlayer({
    name: "Scott Brown",
    number: 5,
    position: "Centre",
    favouriteSharkFact: "Sharks can swim up to 25 miles per hour"
});


const roster = [
    alexPickering,
    nathanMilne,
    abbieStephenson,
    chloeStephenson
];

function displayPlayerCard(player) {
    printDivider();
    console.log(`          #${player.number} PLAYER CARD`);
    printDivider();
    console.log(`Player: ${player.name}`);
    console.log(`Number: ${player.number}`);
    console.log(`Position: ${player.position}`);
    console.log(`Team: ${player.team}`);
    console.log();
    console.log("STATS");
    printDividerShort();
    console.log(`Goals: ${player.goals}`);
    console.log(`Assists: ${player.assists}`);
    console.log(`Points: ${calculatePlayerPoints(player)}`);
    console.log(`Penalty Minutes: ${player.penaltyMinutes}`);
    console.log();
    console.log("FUN FACT");
    printDividerShort();
    console.log(`Fact: ${player.favouriteSharkFact}`);
    printDivider();
    console.log();
    console.log();
    
}
//function to add

function updatePlayerStats(roster, number, statsToAdd) {
    const player = findPlayerByNumber(roster, number);
    if (player) {
        player.goals += statsToAdd.goals ?? 0;
        player.assists += statsToAdd.assists ?? 0;
        player.penaltyMinutes += statsToAdd.penaltyMinutes ?? 0;
        console.log(`Updated ${player.name}'s stats.`);
    } else {
        console.log(`Player with number ${number} not found. Stats not updated.`);
    }
}

function recordGameSheet(roster, gameStats) {
    for (const stats of gameStats) {
        updatePlayerStats(roster, stats.number, stats); {
        }
    }
}

function addPlayerToRoster(roster, player) {
    if (!findPlayerByNumber(roster, player.number)) {
        roster.push(player);
        console.log(`Added ${player.name} to the roster.`);
    } else {
        console.log(`Player with number ${player.number} is already on the roster.`);
    }
}


//this is no longer needed as we have a new function to update player stats

//function updatePlayerGoals(roster, number, goalsToAdd) {
//    const player = findPlayerByNumber(roster, number);
//    if (player) {
//        player.goals += goalsToAdd;
//        console.log(`Updated ${player.name}'s goals to ${player.goals}.`);
//    } else {
//        console.log(`Player with number ${number} not found. Goals not updated.`);
//    }
//}

//function to search
function findPlayerByNumber(roster, number) {
    for (const player of roster) {
        if (player.number === number) {
            return player;
        } 
    }
    return null;
}

// Functions to calculate player stats
function calculatePlayerPoints(player) {
    return player.goals + player.assists;
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


// Functions to calculate team stats
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

// Display UI
function printDivider() {
    console.log("===================================");
}
printDivider();

function printDividerShort() {
    console.log("-----");
}
printDividerShort();

// this is no longer needed as we have a new function to update player stats
// updatePlayerGoals(roster, 90, 2);

//goals, assists, penalty minutes

addPlayerToRoster(roster, scottBrown);

recordGameSheet(roster, [
    { number: 90, goals: 2, assists: 0, penaltyMinutes: 2 },
    { number: 21, goals: 4, assists: 2, penaltyMinutes: 4 },
    { number: 24, goals: 2, assists: 1, penaltyMinutes: 0 }
]);

// this is no longer needed as we have a new function to update player stats via recordGameSheet
// updatePlayerStats(roster, 21, {
//     goals: 3,
//     assists: 2,
//     penaltyMinutes: 4   
// });

console.log();

roster.forEach(displayPlayerCard);


const teamGoals = calculateTeamGoals(roster);
const teamAssists = calculateTeamAssists(roster);
const highestScorer = findTopScorer(roster);
const teamPoints = calculateTeamPoints(roster);
const teamPenaltyMinutes = calculateTeamPenaltyMinutes(roster);

const player = findPlayerByNumber(roster, 21);
if (player) {
    console.log(`Player found: ${player.name}`);
} else {
    console.log("Player not found.");
}


printDivider();
console.log("TEAM STATS");
printDivider();
console.log(`Total team goals this season: ${teamGoals}`);
console.log(`Total team assists this season: ${teamAssists}`);
console.log(`Total team points this season: ${teamPoints}`);
console.log(`Total team penalty minutes this season: ${teamPenaltyMinutes}`);
printDivider();
console.log();
console.log("AWARDS");
printDivider();
console.log(`The top scorer this season is: ${highestScorer.name} with ${highestScorer.goals} goals`);
printDivider();
console.log(`The player number you searched for is:`);
if (player) {
    console.log(player.name);
} else {
    console.log("Player not found.");
}

