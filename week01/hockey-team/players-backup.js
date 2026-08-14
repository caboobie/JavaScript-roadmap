const { createPlayer } = require("./player");
const { createSeasonPlayer } = require("./season");

const alexPickering = createPlayer({
    name: "Alexander Pickering",
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
});

alexPickering.seasons.push(
    createSeasonPlayer("2026/27", 90, "Defence")
);



const nathanMilne = createPlayer({
    name: "Nathan Milne",
    favouriteSharkFact: "Sharks have existed longer than trees"
});

nathanMilne.seasons.push(
    createSeasonPlayer("2026/27", 21, "centre")
);

const abbieStephenson = createPlayer({
    name: "Abbie Stephenson",
    favouriteSharkFact: "Some sharks can replace their teeth thousands of times"
});

abbieStephenson.seasons.push(
    createSeasonPlayer("2026/27", 24, "Left Wing")
);

const chloeStephenson = createPlayer({
    name: "Chloe Stephenson",
    favouriteSharkFact: "Sharks have been around longer than dinosaurs"
});
chloeStephenson.seasons.push(
    createSeasonPlayer("2026/27", 18, "Right Wing")
);
const scottBrown = createPlayer({
    name: "Scott Brown",
    favouriteSharkFact: "Sharks can swim up to 25 miles per hour"
});

scottBrown.seasons.push(
    createSeasonPlayer("2026/27", 5, "Centre")
);








const roster = [
    alexPickering,
    nathanMilne,
    abbieStephenson,
    chloeStephenson,
    scottBrown
];



module.exports = {
    roster
};