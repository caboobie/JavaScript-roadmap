const test = require("node:test");
const assert = require("node:assert");

const {
    calculatePlayerPoints,
    calculateTeamGoals,
    calculateTeamAssists,
    calculateTeamPoints,
    calculateTeamPenaltyMinutes,
    findTopScorer
} = require("../stats");

const roster = [
    {
        name: "Alexander Pickering",
        seasons: [
            {
                season: "2025/26",
                number: 90,
                goals: 2,
                assists: 1,
                penaltyMinutes: 2
            }
        ]
    },
    {
        name: "Nathan Milne",
        seasons: [
            {
                season: "2025/26",
                number: 21,
                goals: 4,
                assists: 3,
                penaltyMinutes: 6
            }
        ]
    }
];

test("calculatePlayerPoints adds goals and assists", () => {
    const points = calculatePlayerPoints(roster[0], "2025/26");
    assert.strictEqual(points, 3);
});

test("calculateTeamGoals totals all goals", () => {
    assert.strictEqual(calculateTeamGoals(roster, "2025/26"), 6);
});

test("calculateTeamAssists totals all assists", () => {
    assert.strictEqual(calculateTeamAssists(roster, "2025/26"), 4);
});

test("calculateTeamPoints totals all points", () => {
    assert.strictEqual(calculateTeamPoints(roster, "2025/26"), 10);
});

test("calculateTeamPenaltyMinutes totals all penalties", () => {
    assert.strictEqual(calculateTeamPenaltyMinutes(roster, "2025/26"), 8);
});

test("findTopScorer returns Nathan Milne", () => {
    const topScorer = findTopScorer(roster, "2025/26");
    assert.strictEqual(topScorer.name, "Nathan Milne");
});