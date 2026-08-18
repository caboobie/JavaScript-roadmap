const { CURRENT_SEASON } = require("./config");
const { createPlayer, createSeasonPlayer } = require("./player");
const { askForNumber } = require("./input");
const { roster, savePlayers} = require("./players");
const { recordGameInteractive } = require("./gameInput");




//add a new player
function addPlayerInteractive(rl, onComplete) {
    console.log();
    console.log("=========================");
    console.log("        ADD PLAYER");
    console.log("=========================");

    rl.question("Enter player name: ", (name) => {

            askForNumber(
                rl,
                "Enter player number: ",
                (number) => {

                    rl.question("Enter player position: ", (position) => {

                        askForNumber(
                            rl,
                            "Enter goals: ",
                            (goals) => {

                                askForNumber(
                                    rl,
                                    "Enter assists: ",
                                    (assists) => {

                                        askForNumber(
                                            rl,
                                            "Enter penalty minutes: ",
                                            (penaltyMinutes) => {

                                                const player = createPlayer({
                                                    name,
                                                    team: "Whitley Bay Sharks"
                                                });

                                                player.seasons.push(
                                                    createSeasonPlayer({
                                                        season: CURRENT_SEASON,
                                                        number,
                                                        position,
                                                        goals,
                                                        assists,
                                                        penaltyMinutes
                                                    })
                                                );

                                                roster.push(player);
                                                savePlayers(roster);

                                                console.log();
                                                console.log(
                                                    `${name} has been added to the ${CURRENT_SEASON} roster.`
                                                );
                                                console.log();

                                                onComplete();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    });
                }
            );
        });
    }


//edit a player
function editPlayerInteractive(rl, onComplete) {
    console.log();
    console.log("=========================");
    console.log("       EDIT PLAYER");
    console.log("=========================");

    askForNumber(
        rl,
        "Enter player number: ",
        (number) => {

            const player = roster.find(player =>
                player.seasons.some(
                    playerSeason =>
                        playerSeason.season === CURRENT_SEASON &&
                        playerSeason.number === number
                )
            );

            if (!player) {
                console.log(
                    `Player with number ${number} not found for ${CURRENT_SEASON}.`
                );

                onComplete();
                return;
            }

            const playerSeason = player.seasons.find(
                season => season.season === CURRENT_SEASON
            );

            showEditPlayerMenu(
                rl,
                player,
                playerSeason,
                onComplete
            );
        }
    );
}
//edit a player menu
function showEditPlayerMenu(
    rl,
    player,
    playerSeason,
    onComplete
) {
    console.log();
    console.log("=========================");
    console.log("       EDIT PLAYER");
    console.log("=========================");
    console.log(`Player: ${player.name}`);
    console.log(`Number: #${playerSeason.number}`);
    console.log(`Position: ${playerSeason.position}`);
    console.log(`Season: ${playerSeason.season}`);
    console.log("=========================");
    console.log("1. Edit Name");
    console.log("2. Edit Number");
    console.log("3. Edit Position");
    console.log("4. Edit Goals");
    console.log("5. Edit Assists");
    console.log("6. Edit Penalty Minutes");
    console.log("7. Cancel");
    console.log("=========================");

    rl.question("Select an option (1-7): ", (choice) => {

        switch (choice) {

            case "1":
                rl.question(
                    "Enter new player name: ",
                    (name) => {
                        player.name = name;

                        savePlayers();

                        console.log("Player name updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;


            case "2":
                askForNumber(
                    rl,
                    "Enter new player number: ",
                    (number) => {
                        playerSeason.number = number;

                        savePlayers();

                        console.log("Player number updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;

            case "3":
                rl.question(
                    "Enter new position: ",
                    (position) => {
                        playerSeason.position = position;

                        savePlayers();

                        console.log("Player position updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;

            case "4":
                askForNumber(
                    rl,
                    "Enter new goals: ",
                    (goals) => {
                        playerSeason.goals = goals;

                        savePlayers();

                        console.log("Goals updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;

            case "5":
                askForNumber(
                    rl,
                    "Enter new assists: ",
                    (assists) => {
                        playerSeason.assists = assists;

                        savePlayers();

                        console.log("Assists updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;

            case "6":
                askForNumber(
                    rl,
                    "Enter new penalty minutes: ",
                    (penaltyMinutes) => {
                        playerSeason.penaltyMinutes = penaltyMinutes;

                        savePlayers();

                        console.log("Penalty minutes updated.");
                        showEditPlayerMenu(
                            rl,
                            player,
                            playerSeason,
                            onComplete
                        );
                    }
                );
                break;

            case "7":
                onComplete();
                break;

            default:
                console.log("Invalid option.");
                showEditPlayerMenu(
                    rl,
                    player,
                    playerSeason,
                    onComplete
                );
                break;
        }
    });
}

function recordNewDataInteractive(rl, onComplete) {
    console.log();
    console.log("=========================");
    console.log("     RECORD NEW DATA");
    console.log("=========================");
    console.log("1. Add Player");
    console.log("2. Add Game Sheet");
    console.log("3. Edit Player");
    console.log("4. Edit Game Sheet");
    console.log("5. Remove Player");
    console.log("6. Remove Game Sheet");
    console.log("7. Main Menu");
    console.log("=========================");

    rl.question("Select an option (1-7): ", (choice) => {

        switch (choice) {

            case "1":
                console.log("You selected: Add Player");
                
                addPlayerInteractive(rl, onComplete);
                break;

            case "2":
                console.log("You selected: Add Game Sheet");

                recordGameInteractive(
                    rl,
                    roster,
                    askForNumber,
                    () => {
                        recordNewDataInteractive(rl, onComplete);
                    }
                );
                break;

            case "3":
                console.log("You selected: Edit Player");
                
                editPlayerInteractive(rl, () => {
                    recordNewDataInteractive(rl, onComplete);
                });

                break;

            case "4":
                console.log("You selected: Edit Game Sheet");
                console.log("Feature not available yet.");
                onComplete();
                break;

            case "5":
                console.log("You selected: Remove Player");
                console.log("Feature not available yet.");
                onComplete();
                break;

            case "6":
                console.log("You selected: Remove Game Sheet");
                console.log("Feature not available yet.");
                onComplete();
                break;

            case "7":
                onComplete();
                break;

            default:
                console.log("Invalid option.");
                recordNewDataInteractive(rl, onComplete);
                break;
        }
    });
}

module.exports = {
    recordNewDataInteractive,
    addPlayerInteractive,
    editPlayerInteractive

};