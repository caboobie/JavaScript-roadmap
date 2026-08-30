const {games } = require('./games');
const { findPlayerByNumber } = require('./roster');
const { editGameInteractive } = require('./gameEdit');
const { printDivider, printDividerShort } = require('./display');

function displayAllGames(roster) {
    console.log();
    printDivider();
    console.log("  ALL GAMES");
    printDivider();
    console.log();

    if (games.length === 0 ) {
        console.log("No games recorded.");
        console.log();
        return;
    }

    games.forEach((game, index) => {

        printDivider();
        console.log(`Game ${index + 1}: ${game.opponent}`);
        printDivider();
        console.log(`Opponent: ${game.opponent}`);
        console.log(`Location: ${game.location}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(`Goals Scored: ${game.ourScore}`);
        console.log(`Goals Conceded: ${game.opponentScore}`);
        console.log(`Result: ${game.result}`);

        printDivider();
        console.log("Player Stats:");
        printDivider();

        game.playerStats.forEach((playerStat) => {

            const player = findPlayerByNumber(
                roster,
                playerStat.number
            );

            if (player) {
                console.log();
                printDividerShort();
                console.log(
                    `player: ${player.name} (#${playerStat.number})`
                );
                

            } else {
                console.log(
                    `player: #${playerStat.number}`
                );
            }

            console.log(`goals: ${playerStat.goals}`);
            console.log(`assists: ${playerStat.assists}`);
            console.log(`penalty minutes: ${playerStat.penaltyMinutes}`);
        });

        console.log("----------------------------");
        console.log();
    });
}

function searchGamesByOpponent(
    rl,
    roster,
    onComplete

) {

    rl.question(
        "Enter opponent team name to search: ",
        (searchTerm) => {

            const searchResults = games.filter((game) =>
                game.opponent
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );

            console.log();
            console.log("=========================");
            console.log("     SEARCH RESULTS");
            console.log("=========================");

            if (searchResults.length === 0) {
                console.log("No games found.");
                onComplete();
                return;
            }

            searchResults.forEach((game, index) => {

                console.log();
                console.log(`${index + 1}. ${game.opponent}`);
                console.log("-------------------------");
                console.log(`Location: ${game.location || "Unknown"}`);
                console.log(`Date: ${game.date}`);
                console.log(`Venue: ${game.venue}`);
                console.log(
                    `Score: Sharks ${game.ourScore} - ${game.opponentScore} ${game.opponent}`
                );
                console.log(`Result: ${game.result}`);
            });

            console.log();
            console.log("0. Cancel");

            rl.question(
                "Select a game: ",
                (selection) => {

                    const selectedIndex = Number(selection) - 1;

                    if (selection === "0") {
                        gamesInteractive(
                            rl,
                            roster,
                            onComplete
                        );
                        return;
                    }

                    if (
                        isNaN(selectedIndex) ||
                        selectedIndex < 0 ||
                        selectedIndex >= searchResults.length
                    ) {
                        console.log("Invalid selection.");

                        searchGamesByOpponent(
                            rl,
                            roster,
                            onComplete
                        );

                        return;
                    }

                    const selectedGame =
                        searchResults[selectedIndex];

                    console.log();
                    console.log("=========================");
                    console.log("      SELECTED GAME");
                    console.log("=========================");
                    console.log(`Opponent: ${selectedGame.opponent}`);
                    console.log(
                        `Location: ${selectedGame.location || "Unknown"}`
                    );
                    console.log(`Date: ${selectedGame.date}`);
                    console.log(`Venue: ${selectedGame.venue}`);
                    console.log(
                        `Score: Sharks ${selectedGame.ourScore} - ${selectedGame.opponentScore} ${selectedGame.opponent}`
                    );
                    console.log(`Result: ${selectedGame.result}`);

                    console.log();
                    
                    editGameInteractive(
                        rl,
                        selectedGame,
                        roster,
                        onComplete
                    );
                }
            );
        }
    );
}

function displayHomeGames(roster) {
    const homeGames = games.filter(
        game => game.location === "Home"
    );
    console.log();
    console.log("==========================");
    console.log("     HOME GAMES");
    console.log("==========================");

    if (homeGames.length === 0) {
        console.log("No Home Games Found");
        return;
    }

    homeGames.forEach((game, index) => {
        console.log();
        console.log(`Game ${index + 1}:`);
        console.log("--------------------------");
        console.log(`Opponent: ${game.opponent}`);
        console.log(`location: ${game.location || "unknown"}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(
            `Score: Sharks ${game.ourScore} - ${game.opponentScore} (${game.opponent})`
        );
        console.log(`Result: ${game.result}`);
        console.log("--------------------------");
    });
}

function displayAwayGames(roster) {
    const awayGames = games.filter(
        game => game.location === "Away"
    );
    console.log();
    console.log("==========================");
    console.log("     AWAY GAMES");
    console.log("==========================");

    if (awayGames.length === 0) {
        console.log("No Away Games Found");
        return;
    }

    awayGames.forEach((game, index) => {
        console.log();
        console.log(`Game ${index + 1}:`);
        console.log("--------------------------");
        console.log(`Opponent: ${game.opponent}`);
        console.log(`location: ${game.location || "unknown"}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(
            `Score: Sharks ${game.ourScore} - ${game.opponentScore} (${game.opponent})`
        );
        console.log(`Result: ${game.result}`);
        console.log("--------------------------");
    });
}

function displayWins(roster) {
    const wins = games.filter(
        game => game.result === "Win"
    );
    console.log();
    console.log("==========================");
    console.log("     WINS");
    console.log("==========================");

    if (wins.length === 0) {
        console.log("No Wins Found");
        return;
    }

    wins.forEach((game, index) => {
        console.log();
        console.log(`Game ${index + 1}:`);
        console.log("--------------------------");
        console.log(`Opponent: ${game.opponent}`);
        console.log(`location: ${game.location || "unknown"}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(
            `Score: Sharks ${game.ourScore} - ${game.opponentScore} (${game.opponent})`
        );
        console.log(`Result: ${game.result}`);
        console.log("--------------------------");
    });
}

function displayLosses(roster) {
    const losses = games.filter(
        game => game.result === "Loss"
    );

    console.log();
    console.log("==========================");
    console.log("     LOSSES");
    console.log("==========================");

    if (losses.length === 0) {
        console.log("No Losses Found");
        return;
    }

    losses.forEach((game, index) => {
        console.log();
        console.log(`Game ${index + 1}:`);
        console.log("--------------------------");
        console.log(`Opponent: ${game.opponent}`);
        console.log(`location: ${game.location || "unknown"}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(
            `Score: Sharks ${game.ourScore} - ${game.opponentScore} (${game.opponent})`
        );
        console.log(`Result: ${game.result}`);
        console.log("--------------------------");
    });
}

function displayDraws(roster) {
    const draws = games.filter(
        game => game.result === "Draw"
    );

    console.log();
    console.log("==========================");
    console.log("     DRAWS");
    console.log("==========================");

    if (draws.length === 0) {
        console.log("No Draws Found");
        return;
    }

    draws.forEach((game, index) => {
        console.log();
        console.log(`Game ${index + 1}:`);
        console.log("--------------------------");
        console.log(`Opponent: ${game.opponent}`);
        console.log(`location: ${game.location || "unknown"}`);
        console.log(`Date: ${game.date}`);
        console.log(`Venue: ${game.venue}`);
        console.log(
            `Score: Sharks ${game.ourScore} - ${game.opponentScore} (${game.opponent})`
        );
        console.log(`Result: ${game.result}`);
        console.log("--------------------------");
    });
}

function gamesInteractive(rl, roster, onComplete) {

    console.log();
    console.log("==========================");
    console.log("    GAMES");
    console.log("==========================");
    console.log("1. View All Games");
    console.log("2. Search Games");
    console.log("3. Home Games");
    console.log("4. Away Games");
    console.log("5. Wins");
    console.log("6. Losses");
    console.log("7. Draws");
    console.log("8. Back to Main Menu");
    console.log("==========================");
    console.log();

    rl.question("select an option (1-8): ", (choice) => {

        switch (choice) {

            case '1':
                displayAllGames(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '2':
                searchGamesByOpponent(
                    rl,
                    roster,
                    () => {
                        gamesInteractive(rl, roster, onComplete);
                    }
                );
                break;


            case '3':
                displayHomeGames(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '4':
                displayAwayGames(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '5':
                displayWins(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '6':
                displayLosses(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '7':
                displayDraws(roster);
                gamesInteractive(rl, roster, onComplete);
                break;

            case '8':
                onComplete();
                break;

            default:
                console.log("Invalid choice. Please select a valid option.");
                gamesInteractive(rl, roster, onComplete);
                break;
        }
    });
}

module.exports = {
    gamesInteractive,
    displayAllGames,
    searchGamesByOpponent,
    displayHomeGames,
    displayAwayGames,
    displayWins,
    displayLosses,
    displayDraws
};