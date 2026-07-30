const { roster } = require('./players');

console.log(roster);

const {
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
} = require('./stats');

console.log(`Goals: ${calculateTeamGoals(roster)}`);
console.log(`Assists: ${calculateTeamAssists(roster)}`);
console.log(`Points: ${calculateTeamPoints(roster)}`);
console.log(`Penalty Minutes: ${calculateTeamPenaltyMinutes(roster)}`);

const topScorer = findTopScorer(roster);

console.log(`Top Scorer: ${topScorer.name} with ${topScorer.goals} goals`);

