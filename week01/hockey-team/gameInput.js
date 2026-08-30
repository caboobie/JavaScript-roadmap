const { createGame, recordGame } = require("./game");
const { findPlayerByNumber } = require("./roster");
const { CURRENT_SEASON } = require("./config");

function recordGameInteractive(rl, roster, askForNumber, onComplete) {
    console.log("You selected: Record Game");

    rl.question("Enter opponent team name: ", (opponent) => {

        rl.question(
            "Home or Away? (H/A): ",
            (locationInput) => {

                const location =
                    locationInput.toLowerCase() === "h"
                        ? "Home"
                        : "Away";

                rl.question(
                    "Enter game date (DD-MM-YYYY): ",
                    (date) => {

                        rl.question(
                            "Enter venue: ",
                            (venue) => {

                                askForNumber(
                                    rl,
                                    "Enter goals scored by Whitley Bay Sharks: ",
                                    (goalsScored) => {

                                        askForNumber(
                                            rl,
                                            "Enter goals scored by opponent: ",
                                            (goalsConceded) => {

                                                const gameSheet = [];

                                                function askForPlayer() {
                                                    rl.question(
                                                        "Enter player number (or type 'done' to finish): ",
                                                        (playerNumber) => {

                                                            if (
                                                                playerNumber.toLowerCase() === "done"
                                                            ) {

                                                                const game =
                                                                    createGame(
                                                                        opponent,
                                                                        location,
                                                                        date,
                                                                        venue,
                                                                        goalsScored,
                                                                        goalsConceded,
                                                                        gameSheet
                                                                    );

                                                                recordGame(
                                                                    roster,
                                                                    gameSheet,
                                                                    CURRENT_SEASON
                                                                );
                                                                console.log();
                                                                console.log(
                                                                    "Game recorded."
                                                                );
                                                                console.log(game);
                                                                console.log();

                                                                onComplete();
                                                                return;
                                                            }

                                                            const number =
                                                                Number(playerNumber);

                                                            if (isNaN(number)) {
                                                                console.log(
                                                                    "Invalid input. Please enter a valid number."
                                                                );
                                                                askForPlayer();
                                                                return;
                                                            }

                                                            const player =
                                                                findPlayerByNumber(
                                                                    roster,
                                                                    number
                                                                );

                                                            if (!player) {
                                                                console.log(
                                                                    `Player with number ${number} not found in the roster.`
                                                                );
                                                                askForPlayer();
                                                                return;
                                                            }

                                                            const existingPlayer =
                                                                gameSheet.find(
                                                                    player =>
                                                                        player.number ===
                                                                        number
                                                                );

                                                            if (existingPlayer) {
                                                                console.log(
                                                                    `Player with number ${number} has already been added to the game sheet.`
                                                                );
                                                                askForPlayer();
                                                                return;
                                                            }

                                                            askForNumber(
                                                                rl,
                                                                "Goals scored by player: ",
                                                                (goals) => {

                                                                    askForNumber(
                                                                        rl,
                                                                        "Assists made by player: ",
                                                                        (assists) => {

                                                                            askForNumber(
                                                                                rl,
                                                                                "Penalty minutes for player: ",
                                                                                (penaltyMinutes) => {

                                                                                    gameSheet.push(
                                                                                        {
                                                                                            number,
                                                                                            goals,
                                                                                            assists,
                                                                                            penaltyMinutes
                                                                                        }
                                                                                    );

                                                                                    console.log(
                                                                                        `Player ${player.name} (#${number}) added to the game sheet.`
                                                                                    );

                                                                                    console.log();

                                                                                    askForPlayer();
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }

                                                askForPlayer();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
}

module.exports = {
    recordGameInteractive
};