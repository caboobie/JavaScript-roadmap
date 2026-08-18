const readline = require('readline');
const { showMenu } = require('./menu');
const { roster } = require('./players');
const { askForNumber } = require('./input');
const { CURRENT_SEASON } = require('./config');
const { recordNewDataInteractive } = require('./dataInput');
const { gamesInteractive } = require('./gamesInteractive');
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
                    CURRENT_SEASON,
                    calculateTeamGoals,
                    calculateTeamAssists,
                    calculateTeamPoints,
                    calculateTeamPenaltyMinutes,
                    findTopScorer
                );
                
                startInteractive(); // Show the menu again after viewing team stats
                break;

            case '4':
                console.log(" You selected: Games");

                gamesInteractive(
                    rl,
                    roster,
                    startInteractive
                );
                break;
            
            case '5':
                recordNewDataInteractive(rl, startInteractive);
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