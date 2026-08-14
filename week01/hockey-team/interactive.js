const readline = require('readline');
const { showMenu } = require('./menu');
const { roster } = require('./players');
const { askForNumber } = require('./input');
const { recordGameInteractive } = require('./gameInput');


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

const { recordGame, createGame } = require('./game');
const { games } = require('./games');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



function startInteractive() {
    showMenu();

    rl.question("Select an option (1-6): ", (choice) => {

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
                askForNumber(rl, "Enter player number: ", (playerNumber) => {
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
                    "2026/27",
                    calculateTeamGoals,
                    calculateTeamAssists,
                    calculateTeamPoints,
                    calculateTeamPenaltyMinutes,
                    findTopScorer
                );
                
                startInteractive(); // Show the menu again after viewing team stats
                break;

            case '4':
    recordGameInteractive(
        rl,
        roster,
        askForNumber,
        () => {
            startInteractive();
        }
    );
    break;
            case '5':
                console.log(" You selected: View Games");

                if (games.length === 0) {
                    console.log("No games recorded.");
                } else {
                    games.forEach((game, index) => {
                        console.log("===========================");
                        console.log(`Game ${index + 1}:`);
                        console.log("============================");
                        console.log(`Opponent: ${game.opponent}`);
                        console.log(`Date: ${game.date}`);
                        console.log(`Venue: ${game.venue}`);
                        console.log(`Goals Scored: ${game.ourScore}`);
                        console.log(`Goals Conceded: ${game.opponentScore}`);
                        console.log(`Result: ${game.result}`);
                        console.log("============================");
                        console.log("Player Stats:");
                        console.log("============================");
                        game.playerStats.forEach((playerStat) => {
                            const player = findPlayerByNumber(roster, playerStat.number);
                            if (player) {
                                console.log(`Player: ${player.name} (Number: ${player.number})`);
                                console.log(`Goals: ${playerStat.goals}`);
                                console.log(`Assists: ${playerStat.assists}`);
                                console.log(`Penalty Minutes: ${playerStat.penaltyMinutes}`);
                                console.log("----------------------------");
                            }
                        });
                    });

                }
                startInteractive(); // Show the menu again after viewing games
                break;

                case '6':
                    console.log("Goodbye!");
                rl.close();
                return;

            default:
                console.log(" Invalid option. Please select a number between 1 and 6.");

                startInteractive();
                break;
        }
    });
}

startInteractive();