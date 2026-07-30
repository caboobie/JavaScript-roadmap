const { createPlayer } = require("./player");

const testPlayer = createPlayer({
    name: "Test Player",
    number: 99,
    position: "Forward"
});

console.log(testPlayer);