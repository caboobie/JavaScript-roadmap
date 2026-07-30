// Player data
const { roster } = require('./players');

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
    findPlayerByNumber,
    addPlayerToRoster,
    updatePlayerStats,
    recordGameSheet
} = require('./roster');

//Test updating a player's stats
updatePlayerStats(roster, 90, { goals: 1, assists: 2, penaltyMinutes: 0 });

const alex = findPlayerByNumber(roster, 90);
console.log(alex);


console.log(`Goals: ${calculateTeamGoals(roster)}`);
console.log(`Assists: ${calculateTeamAssists(roster)}`);
console.log(`Points: ${calculateTeamPoints(roster)}`);
console.log(`Penalty Minutes: ${calculateTeamPenaltyMinutes(roster)}`);

const topScorer = findTopScorer(roster);

console.log(`Top Scorer: ${topScorer.name} with ${topScorer.goals} goals`);

