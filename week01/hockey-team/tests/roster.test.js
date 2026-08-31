const test = require("node:test");
const assert = require("node:assert");

const {
    findPlayerByNumber,
    adjustPlayerSeasonStats
} = require("../roster");

const roster = [
    {
        name: "Alexander Pickering",
        team: "Whitley Bay Sharks",
        seasons: [
            {
                season: "2025/26",
                number: 90,
                position: "Defence",
                goals: 2,
                assists: 1,
                penaltyMinutes: 2
            }
        ]
    },
    {
        name: "Nathan Milne",
        team: "Whitley Bay Sharks",
        seasons: [
            {
                season: "2025/26",
                number: 21,
                position: "Centre",
                goals: 4,
                assists: 3,
                penaltyMinutes: 6
            }
        ]
    }
];

test("findPlayerByNumber finds a player by number", () => {
    const player = findPlayerByNumber(roster, 90);

    assert.strictEqual(player.name, "Alexander Pickering");
});

test("findPlayerByNumber returns undefined for an unknown number", () => {
    const player = findPlayerByNumber(roster, 999);

    assert.strictEqual(player, undefined);
});

test("findPlayerByNumber finds the correct player when multiple players exist", () => {
    const player = findPlayerByNumber(roster, 21);

    assert.strictEqual(player.name, "Nathan Milne");
});

test("adjustPlayerSeasonStats adds goals correctly", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        90,
        "2025/26",
        3,
        0,
        0
    );

    assert.strictEqual(result, true);
    assert.strictEqual(testRoster[0].seasons[0].goals, 5);
});

test("adjustPlayerSeasonStats adds assists correctly", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        90,
        "2025/26",
        0,
        2,
        0
    );

    assert.strictEqual(result, true);
    assert.strictEqual(testRoster[0].seasons[0].assists, 3);
});

test("adjustPlayerSeasonStats adds penalty minutes correctly", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        90,
        "2025/26",
        0,
        0,
        4
    );

    assert.strictEqual(result, true);
    assert.strictEqual(testRoster[0].seasons[0].penaltyMinutes, 6);
});

test("adjustPlayerSeasonStats can subtract stats", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        90,
        "2025/26",
        -1,
        -1,
        -1
    );

    assert.strictEqual(result, true);
    assert.strictEqual(testRoster[0].seasons[0].goals, 1);
    assert.strictEqual(testRoster[0].seasons[0].assists, 0);
    assert.strictEqual(testRoster[0].seasons[0].penaltyMinutes, 1);
});

test("adjustPlayerSeasonStats returns false for an unknown player", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        999,
        "2025/26",
        1,
        1,
        1
    );

    assert.strictEqual(result, false);
});

test("adjustPlayerSeasonStats returns false for an unknown season", () => {
    const testRoster = structuredClone(roster);

    const result = adjustPlayerSeasonStats(
        testRoster,
        90,
        "2024/25",
        1,
        1,
        1
    );

    assert.strictEqual(result, false);
});