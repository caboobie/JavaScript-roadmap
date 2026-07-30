const { createPlayer } = require("./player");

const alexPickering = createPlayer({
    name: "Alexander Pickering",
    number: 90,
    position: "Defence",
    goals: 0,
    assists: 1,
    penaltyMinutes: 8,
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
});

const nathanMilne = createPlayer({
    name: "Nathan Milne",
    number: 21,
    position: "Centre",
    goals: 5,
    assists: 8,
    penaltyMinutes: 0,
    favouriteSharkFact: "Sharks have existed longer than trees"
});

const abbieStephenson = createPlayer({
    name: "Abbie Stephenson",
    number: 24,
    position: "Left Winger",
    goals: 7,
    assists: 4,
    penaltyMinutes: 6,
    favouriteSharkFact: "Some sharks can replace their teeth thousands of times"
});

const chloeStephenson = createPlayer({
    name: "Chloe Stephenson",
    number: 12,
    position: "Right Winger",
    favouriteSharkFact: "Sharks have been around longer than dinosaurs"
});

const scottBrown = createPlayer({
    name: "Scott Brown",
    number: 5,
    position: "Centre",
    favouriteSharkFact: "Sharks can swim up to 25 miles per hour"
});










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