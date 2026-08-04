const readline = require('readline');

const { roster } = require('./players');
const { displayPlayerCard } = require('./display');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("============================");
    console.log("      WHITLEY BAY SHARKS");
    console.log("============================");
    console.log("1. View Roster");
    console.log("2. Find Player");
    console.log("3. View Team Stats");
    console.log("4. Exit");
    console.log("============================");
}

function startInteractive() {
    showMenu();

    rl.question("Select an option (1-4): ", (choice) => {

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
                break;

            case '3':
                console.log(" You selected: View Team Stats");
                // Call the function to view team stats here
                break;

            case '4':
                console.log("Goodbye!");
                rl.close();
                return;

            default:
                console.log(" Invalid option. Please select a number between 1 and 4.");

                startInteractive();
                break;
        }
    });
}

startInteractive();