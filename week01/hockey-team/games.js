const games = [];

function addGame(game) {
    const existingGame = games.find(existingGame =>
        existingGame.opponent === game.opponent &&
        existingGame.date === game.date
    );

    if (existingGame) {
        console.log(
            `Game against ${game.opponent} on ${game.date} already exists.`
        );
        return false;
    }

    games.push(game);

    console.log(`Game against ${game.opponent} on ${game.date} added successfully.`);
    return true;
}

module.exports = {
    games,
    addGame
};