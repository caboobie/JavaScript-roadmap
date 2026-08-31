// One-time script: recalculates each player's season goals/assists/penaltyMinutes
// by summing their stats across every recorded game.
// Run with: node backfillStats.js

const fs = require("fs");

const PLAYERS_PATH = "./data/players.json";
const GAMES_PATH = "./data/games.json";

const roster = JSON.parse(fs.readFileSync(PLAYERS_PATH, "utf8"));
const games = JSON.parse(fs.readFileSync(GAMES_PATH, "utf8"));

// Build totals per player number per season, summed across all games
const totals = {}; // totals[number][season] = { goals, assists, penaltyMinutes }

games.forEach((game) => {
    const season = game.season;

    game.playerStats.forEach((stat) => {
        if (!totals[stat.number]) {
            totals[stat.number] = {};
        }

        if (!totals[stat.number][season]) {
            totals[stat.number][season] = {
                goals: 0,
                assists: 0,
                penaltyMinutes: 0
            };
        }

        totals[stat.number][season].goals += stat.goals;
        totals[stat.number][season].assists += stat.assists;
        totals[stat.number][season].penaltyMinutes += stat.penaltyMinutes;
    });
});

// Apply totals to the roster, only for players/seasons that appear in games.
// Players with no recorded games are left untouched.
let updatedCount = 0;

roster.forEach((player) => {
    player.seasons.forEach((playerSeason) => {
        const playerTotals = totals[playerSeason.number];

        if (playerTotals && playerTotals[playerSeason.season]) {
            const correct = playerTotals[playerSeason.season];

            const changed =
                playerSeason.goals !== correct.goals ||
                playerSeason.assists !== correct.assists ||
                playerSeason.penaltyMinutes !== correct.penaltyMinutes;

            if (changed) {
                console.log(
                    `${player.name} (#${playerSeason.number}, ${playerSeason.season}): ` +
                    `${playerSeason.goals}G/${playerSeason.assists}A/${playerSeason.penaltyMinutes}PIM ` +
                    `-> ${correct.goals}G/${correct.assists}A/${correct.penaltyMinutes}PIM`
                );
                updatedCount++;
            }

            playerSeason.goals = correct.goals;
            playerSeason.assists = correct.assists;
            playerSeason.penaltyMinutes = correct.penaltyMinutes;
        }
    });
});

fs.writeFileSync(PLAYERS_PATH, JSON.stringify(roster, null, 4));

console.log();
console.log(`Done. ${updatedCount} player-season record(s) corrected.`);