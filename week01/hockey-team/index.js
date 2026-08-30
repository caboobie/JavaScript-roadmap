// Player data
const { roster } = require('./players');
const { recordGame } = require('./game');

// Statistics
const {
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
} = require('./stats');

//Roster management
const {
    findPlayerByNumber
} = require('./roster');

//Display
const {
    displayPlayerCard,
    displayPlayerCardShort,
    displayTeamStats,
    printDivider
} = require(`./display`);

//inputs
const { createPlayer } = require(`./player`);
const { addPlayerToRoster } = require(`./roster`);

const sarahWilson = createPlayer({
    name: "Sarah Wilson",
    number: 18,
    position: "Defence",
    goals: 2,
    assists: 5,
    penaltyMinutes: 4,
});

addPlayerToRoster(roster, sarahWilson);

const gameSheet = [
    { number: 90, goals: 1, assists: 2, penaltyMinutes: 0 },
    { number: 24, goals: 0, assists: 1, penaltyMinutes: 2 },
    { number: 18, goals: 2, assists: 0, penaltyMinutes: 0 }
];

recordGame(roster, gameSheet);

console.log();
console.log("TEAM STATS");

console.log(`Goals: ${calculateTeamGoals(roster)}`);
console.log(`Assists: ${calculateTeamAssists(roster)}`);
console.log(`Points: ${calculateTeamPoints(roster)}`);
console.log(`Penalty Minutes: ${calculateTeamPenaltyMinutes(roster)}`);

console.log();

const topScorer = findTopScorer(roster);

console.log(`Top Scorer: ${topScorer.name} with ${topScorer.goals} goals`);

roster.forEach(displayPlayerCard);