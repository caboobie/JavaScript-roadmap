const TEAM_NAME = "Whitley Bay Sharks";

const alexPickering = {
    name: "Alexander Pickering",
    number: 90,
    position: "Defence",
    team: TEAM_NAME,
    goals: 0,
    assists: 1,
    penaltyMinutes: 8,
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
};

const nathanMilne = {
    name: "Nathan Milne",
    number: 21,
    position: "Centre",
    team: TEAM_NAME,
    goals: 5,
    assists: 8,
    penaltyMinutes: 0,
    favouriteSharkFact: "Sharks have existed longer than trees"
};

const abbieStephenson = {
    name: "Abbie Stephenson",
    number: 24,
    position: "Left Winger",
    team: TEAM_NAME,
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


roster.forEach(displayPlayerCard);

const teamGoals = calculateTeamGoals(roster);
const teamAssists = calculateTeamAssists(roster);
const highestScorer = findTopScorer(roster);
const teamPoints = calculateTeamPoints(roster);
const teamPenaltyMinutes = calculateTeamPenaltyMinutes(roster);

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

