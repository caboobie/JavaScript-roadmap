const { saveGames } = require("./games");
const { findPlayerByNumber, adjustPlayerSeasonStats } = require("./roster");
const { CURRENT_SEASON } = require("./config");

function editGameInteractive(
    rl,
    game,
    roster,
    onComplete,
    originalPlayerStats = null
) {

    if (!originalPlayerStats) {
    originalPlayerStats = game.playerStats.map(playerStat => ({
        number: playerStat.number,
        goals: playerStat.goals,
        assists: playerStat.assists,
        penaltyMinutes: playerStat.penaltyMinutes
    }));
}

    console.log();
    console.log("=========================");
    console.log("        EDIT GAME");
    console.log("=========================");
    console.log(`Opponent: ${game.opponent}`);
    console.log(`Location: ${game.location || "Unknown"}`);
    console.log(`Date: ${game.date}`);
    console.log(`Venue: ${game.venue}`);
    console.log(`Sharks Score: ${game.ourScore}`);
    console.log(`Opponent Score: ${game.opponentScore}`);
    console.log("=========================");

    console.log("1. Edit Opponent");
    console.log("2. Edit Home/Away");
    console.log("3. Edit Date");
    console.log("4. Edit Venue");
    console.log("5. Edit Sharks Score");
    console.log("6. Edit Opponent Score");
    console.log("7. Edit Player Stats");
    console.log("8. Save and Exit");

    rl.question("Select an option (1-8): ", (choice) => {

        switch (choice) {

            case "1":
                rl.question(
                    "Enter new opponent: ",
                    (opponent) => {
                        game.opponent = opponent;
                        editGameInteractive(rl, game, roster, onComplete, originalPlayerStats);
                    }
                );
                break;

            case "2":
                rl.question(
                    "Home or Away? (H/A): ",
                    (locationInput) => {

                        if (
                            locationInput.toLowerCase() === "h"
                        ) {
                            game.location = "Home";
                        } else if (
                            locationInput.toLowerCase() === "a"
                        ) {
                            game.location = "Away";
                        } else {
                            console.log(
                                "Invalid choice. Please enter H or A."
                            );
                        }

                        editGameInteractive(
                            rl,
                            game,
                            roster,
                            onComplete,
                            originalPlayerStats
                        );
                    }
                );
                break;

            case "3":
                rl.question(
                    "Enter new date (DD-MM-YYYY): ",
                    (date) => {
                        game.date = date;
                        editGameInteractive(
                            rl,
                            game,
                            roster,
                            onComplete,
                            originalPlayerStats
                        );
                    }
                );
                break;

            case "4":
                rl.question(
                    "Enter new venue: ",
                    (venue) => {
                        game.venue = venue;
                        editGameInteractive(
                            rl,
                            game,
                            roster,
                            onComplete,
                            originalPlayerStats
                        );
                    }
                );
                break;

            case "5":
                rl.question(
                    "Enter new Sharks score: ",
                    (score) => {

                        const newScore = Number(score);

                        if (isNaN(newScore)) {
                            console.log(
                                "Please enter a valid number."
                            );
                        } else {
                            game.ourScore = newScore;
                        }

                        editGameInteractive(
                            rl,
                            game,
                            roster,
                            onComplete,
                            originalPlayerStats
                        );
                    }
                );
                break;

            case "6":
                rl.question(
                    "Enter new opponent score: ",
                    (score) => {

                        const newScore = Number(score);

                        if (isNaN(newScore)) {
                            console.log(
                                "Please enter a valid number."
                            );
                        } else {
                            game.opponentScore = newScore;
                        }

                        editGameInteractive(
                            rl,
                            game,
                            roster,
                            onComplete,
                            originalPlayerStats
                        );
                    }
                );
                break;

            case "7":
                editPlayerStatsInteractive(
                    rl,
                    game,
                    roster,
                    onComplete,
                    originalPlayerStats
                );
                break;

           case "8":

    updateGameResult(game);

    for (const originalStat of originalPlayerStats) {

        const currentStat = game.playerStats.find(
            playerStat =>
                playerStat.number === originalStat.number
        );

        if (!currentStat) {
            continue;
        }

        const goalsDifference =
            currentStat.goals - originalStat.goals;

        const assistsDifference =
            currentStat.assists - originalStat.assists;

        const penaltyMinutesDifference =
            currentStat.penaltyMinutes -
            originalStat.penaltyMinutes;

        if (
            goalsDifference !== 0 ||
            assistsDifference !== 0 ||
            penaltyMinutesDifference !== 0
        ) {

            adjustPlayerSeasonStats(
                roster,
                currentStat.number,
                game.season || CURRENT_SEASON,
                goalsDifference,
                assistsDifference,
                penaltyMinutesDifference
            );
        }
    }

    saveGames();

    console.log();
    console.log("Game and player stats saved successfully.");
    console.log();

    onComplete();
    break;

            default:
                console.log(
                    "Invalid option. Please select 1-7."
                );

                editGameInteractive(
                    rl,
                    game,
                    roster,
                    onComplete,
                    originalPlayerStats
                );
        }
    });
}

function editPlayerStatsInteractive(rl,
    game,
    roster,
    onComplete,
    originalPlayerStats
) {

    console.log();
    console.log("=========================");
    console.log("   EDIT PLAYER STATS");
    console.log("=========================");

    if (game.playerStats.length === 0) {
        console.log("No player stats recorded for this game.");
        editGameInteractive(rl, game, roster, onComplete);
        return;
    }

    game.playerStats.forEach((playerStat, index) => {

        const player = findPlayerByNumber(
            roster,
            playerStat.number
        );

        const playerName = player
            ? player.name
            : "Unknown Player";

            console.log(
                `${index + 1}. ${playerName} (Number: ${playerStat.number}) - Goals: ${playerStat.goals}, Assists: ${playerStat.assists}, Penalty Minutes: ${playerStat.penaltyMinutes}`
            );

            console.log(`    Goals: ${playerStat.goals}`);
            console.log(`    Assists: ${playerStat.assists}`);
            console.log(
                `    Penalty Minutes: ${playerStat.penaltyMinutes}`
            );
            console.log("-------------------------");
            console.log();
        });

        console.log("0. Back");

        rl.question(
            "Select a player: ",
            (selection) => {

                if (selection === "0") {
                    editGameInteractive(
                        rl,
                        game,
                        roster,
                        onComplete,
                        originalPlayerStats
                    );
                    return;
                
                }

                const playerIndex = Number(selection) - 1;

                if (
                    isNaN(playerIndex) ||
                    playerIndex < 0 ||
                    playerIndex >= game.playerStats.length
                ) {
                    console.log("Invalid selection. Please try again.");
                    editPlayerStatsInteractive(
                        rl,
                        game,
                        roster,
                        onComplete,
                        originalPlayerStats
                    );
                    return;
                }

                const playerStat = 
                    game.playerStats[playerIndex];

                editSinglePlayerStats(
                    rl,
                    playerStat,
                    game,
                    roster,
                    onComplete,
                    originalPlayerStats
                );
            }
        );
}

function editSinglePlayerStats(
    rl,
    playerStat,
    game,
    roster,
    onComplete,
    originalPlayerStats
) {

    const player = findPlayerByNumber(
        roster,
        playerStat.number
    );

    console.log();
    console.log("=========================");
    console.log(
        `EDITING: ${player ? player.name : "Unknown Player"}`
    );
    console.log("=========================");

    console.log(`Goals: ${playerStat.goals}`);
    console.log(`Assists: ${playerStat.assists}`);
    console.log(
        `Penalty Minutes: ${playerStat.penaltyMinutes}`
    );

    console.log();
    console.log("1. Edit Goals");
    console.log("2. Edit Assists");
    console.log("3. Edit Penalty Minutes");
    console.log("4. Back");

    rl.question(
        "Select an option (1-4): ",
        (choice) => {

            switch (choice) {

                case "1":
                    rl.question(
                        "Enter new goals: ",
                        (value) => {

                            const number = Number(value);

                            if (isNaN(number) || number < 0) {
                                console.log(
                                    "Please enter a valid number."
                                );

                                editSinglePlayerStats(
                                    rl,
                                    playerStat,
                                    game,
                                    roster,
                                    onComplete,
                                    originalPlayerStats
                                );

                                return;
                            }

                            playerStat.goals = number;

                            editSinglePlayerStats(
                                rl,
                                playerStat,
                                game,
                                roster,
                                onComplete,
                                originalPlayerStats
                            );
                        }
                    );
                    break;

                case "2":
                    rl.question(
                        "Enter new assists: ",
                        (value) => {

                            const number = Number(value);

                            if (isNaN(number) || number < 0) {
                                console.log(
                                    "Please enter a valid number."
                                );

                                editSinglePlayerStats(
                                    rl,
                                    playerStat,
                                    game,
                                    roster,
                                    onComplete,
                                    originalPlayerStats
                                );

                                return;
                            }

                            playerStat.assists = number;

                            editSinglePlayerStats(
                                rl,
                                playerStat,
                                game,
                                roster,
                                onComplete,
                                originalPlayerStats
                            );
                        }
                    );
                    break;

                case "3":
                    rl.question(
                        "Enter new penalty minutes: ",
                        (value) => {

                            const number = Number(value);

                            if (isNaN(number) || number < 0) {
                                console.log(
                                    "Please enter a valid number."
                                );

                                editSinglePlayerStats(
                                    rl,
                                    playerStat,
                                    game,
                                    roster,
                                    onComplete,
                                    originalPlayerStats
                                );

                                return;
                            }

                            playerStat.penaltyMinutes = number;

                            editSinglePlayerStats(
                                rl,
                                playerStat,
                                game,
                                roster,
                                onComplete,
                                originalPlayerStats
                            );
                        }
                    );
                    break;

                case "4":

                    editPlayerStatsInteractive(
                        rl,
                        game,
                        roster,
                        onComplete,
                        originalPlayerStats
                    );

                    break;

                default:
                    console.log(
                        "Invalid option."
                    );

                    editSinglePlayerStats(
                        rl,
                        playerStat,
                        game,
                        roster,
                        onComplete,
                        originalPlayerStats
                    );
            }
        }
    );
}

function updateGameResult(game) {

    if (game.ourScore > game.opponentScore) {
        game.result = "Win";
    } else if (
        game.ourScore < game.opponentScore
    ) {
        game.result = "Loss";
    } else {
        game.result = "Draw";
    }
}

module.exports = {
    editGameInteractive
};