const test = require("node:test");
const assert = require("node:assert");

const { createGame, recordGame } = require("../game");
const players = require("../players");


test("createGame records a win correctly", () => {
    const game = createGame(
        "Leeds Raptors",
        "Away",
        "11-11-2025",
        "Planet Ice Leeds",
        5,
        2,
        []
    );

    assert.strictEqual(game.result, "Win");
    assert.strictEqual(game.ourScore, 5);
    assert.strictEqual(game.opponentScore, 2);
});

test("createGame records a loss correctly", () => {
    const game = createGame(
        "Billingham Blackhawks",
        "Home",
        "12-11-2025",
        "Whitley Bay Ice Rink",
        2,
        5,
        []
    );

    assert.strictEqual(game.result, "Loss");
});

test("createGame records a draw correctly", () => {
    const game = createGame(
        "Coventry Coyotes",
        "Home",
        "13-11-2025",
        "Whitley Bay Ice Rink",
        3,
        3,
        []
    );

    assert.strictEqual(game.result, "Draw");
});

test("createGame stores player stats", () => {
    const playerStats = [
        {
            number: 90,
            goals: 2,
            assists: 1,
            penaltyMinutes: 4
        }
    ];

    const game = createGame(
        "Leeds Raptors",
        "Away",
        "14-11-2025",
        "Planet Ice Leeds",
        3,
        1,
        playerStats
    );

    assert.deepStrictEqual(game.playerStats, playerStats);
});

test("createGame stores the correct opponent and venue", () => {
    const game = createGame(
        "Telford Spartans",
        "Home",
        "15-11-2025",
        "Whitley Bay Ice Rink",
        4,
        2,
        []
    );

    assert.strictEqual(game.opponent, "Telford Spartans");
    assert.strictEqual(game.location, "Home");
    assert.strictEqual(game.venue, "Whitley Bay Ice Rink");
});

test("recordGame updates player season goals", (t) => {
    t.mock.method(players, "savePlayers", () => {});
    
    
    const roster = [
        {
            name: "Alexander Pickering",
            seasons: [
                {
                    season: "2025/26",
                    number: 90,
                    position: "Defence",
                    goals: 0,
                    assists: 0,
                    penaltyMinutes: 0
                }
            ]
        }
    ];

    const gameSheet = [
        {
            number: 90,
            goals: 2,
            assists: 0,
            penaltyMinutes: 0
        }
    ];

    recordGame(roster, gameSheet, "2025/26");

    assert.strictEqual(roster[0].seasons[0].goals, 2);
});

test("recordGame updates goals, assists and penalty minutes", (t) => {
    t.mock.method(players, "savePlayers", () => {});

    const roster = [
        {
            name: "Alexander Pickering",
            seasons: [
                {
                    season: "2025/26",
                    number: 90,
                    position: "Defence",
                    goals: 1,
                    assists: 2,
                    penaltyMinutes: 4
                }
            ]
        }
    ];

    const gameSheet = [
        {
            number: 90,
            goals: 3,
            assists: 2,
            penaltyMinutes: 6
        }
    ];

    recordGame(roster, gameSheet, "2025/26");

    assert.strictEqual(roster[0].seasons[0].goals, 4);
    assert.strictEqual(roster[0].seasons[0].assists, 4);
    assert.strictEqual(roster[0].seasons[0].penaltyMinutes, 10);
});