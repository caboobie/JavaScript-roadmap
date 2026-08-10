const readline = require('readline');

const { roster } = require('./players');

const { displayPlayerCard, 
displayTeamStats
 } = require('./display');

const { findPlayerByNumber } = require('./roster');

const { calculateTeamGoals,
        calculateTeamAssists,
        calculateTeamPoints,
        calculateTeamPenaltyMinutes,
        findTopScorer 
    } = require('./stats');

const { recordGame } = require('./game');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askForNumber(question, callback) {
    rl.question(question, (answer) => {
        const number = Number(answer);

        if (isNaN(number)) {
            console.log("Invalid input. Please enter a valid number.");
            askForNumber(question, callback);
        return;
        }

        callback(number);
    });
}


function showMenu() {
    console.log("============================");
    console.log("      WHITLEY BAY SHARKS");
    console.log("============================");
    console.log("1. View Roster");
    console.log("2. Find Player");
    console.log("3. View Team Stats");
    console.log("4. Record Game");
    console.log("5. Exit");
    console.log("============================");
    console.log("============================");
}

function startInteractive() {
    showMenu();

    rl.question("Select an option (1-5): ", (choice) => {

        switch (choice) {
            case '1':
                console.log(" You selected: View Roster");
                // Call the function to view the roster here
                roster.forEach(displayPlayerCard);

                startInteractive(); // Show the menu again after displaying the roster
                break;

            case '2':
                console.log(" You selected: Find Player");
                // Call the function to find a player here
                askForNumber("Enter player number: ", (playerNumber) => {
                    const player = findPlayerByNumber(roster, playerNumber);

                    if (player) {
                        displayPlayerCard(player);
                    } else {
                        console.log(" Player not found.");
                    }
                    startInteractive(); // Show the menu again after finding the player
                });
                break;

            case '3':
                console.log(" You selected: View Team Stats");
                // Call the function to view team stats here
                displayTeamStats(
                    roster,
                    calculateTeamGoals,
                    calculateTeamAssists,
                    calculateTeamPoints,
                    calculateTeamPenaltyMinutes,
                    findTopScorer
                );
                
                startInteractive(); // Show the menu again after viewing team stats
                break;

            case '4':
                console.log(" You selected: Record Game");

                const gameSheet = [];

                function askForPlayer() {
                    

                    rl.question("Enter player number (or type 'done' to finish): ", (playerNumber) => {

                        if (playerNumber.toLowerCase() === 'done') {
                            recordGame(roster, gameSheet);
                            console.log(" Game recorded.");
                            startInteractive();
                            return;
                        }

                        const number = Number(playerNumber);

                        if (isNaN(number)) {
                            console.log("Invalid input. Please enter a valid number.");
                            askForPlayer();
                            return;
                        }

                        const player = findPlayerByNumber(roster, number);

                        if (!player) {
                            console.log(`Player with number ${number} not found in the roster.`);
                            askForPlayer();
                            return;
                        }

                        const existingPlayer = gameSheet.find(
                            player => player.number === number
                        );

                        if (existingPlayer) {
                            console.log(`Player with number ${number} has already been added to the game sheet.`);
                            askForPlayer();
                            return;
                        }
                        



                        askForNumber("Goals scored by player: ", (goals) => {
                            askForNumber("Assists made by player: ", (assists) => {
                                askForNumber("Penalty minutes for player: ", (penaltyMinutes) => {

                                    gameSheet.push({
                                        number: number,
                                        goals: goals,
                                        assists: assists,
                                        penaltyMinutes: penaltyMinutes
                                    });

                                    console.log(`Player ${player.name} (Number: ${player.number}) added to the game sheet.`);
                                    console.log();

                                    askForPlayer();
                                });
                            });
                        });
                    });
                }
                askForPlayer();
                break;

            case '5':
                console.log("Goodbye!");
                rl.close();
                return;

            default:
                console.log(" Invalid option. Please select a number between 1 and 5.");

                startInteractive();
                break;
        }
    });
}

startInteractive();