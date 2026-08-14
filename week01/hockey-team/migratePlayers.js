const { createPlayer, createSeasonPlayer } = require("./player");

const alexPickering = createPlayer({
    name: "Alexander Pickering",
    favouriteSharkFact: "Sharks first appeared 450 million years ago!"
});

alexPickering.seasons.push(
    createSeasonPlayer({
        season: "2026/27",
        number: 90,
        position: "Defence",
        goals: 2,
        assists: 0,
        penaltyMinutes: 0
    })
);

const nathanMilne = createPlayer({
    name: "Nathan Milne",
    favouriteSharkFact: "Sharks have existed longer than trees"
});

nathanMilne.seasons.push(
    createSeasonPlayer({
        season: "2026/27",
        number: 21,
        position: "Centre",
        goals: 0,
        assists: 0,
        penaltyMinutes: 0
    })
);

const abbieStephenson = createPlayer({
    name: "Abbie Stephenson",
    favouriteSharkFact: "Some sharks can replace their teeth thousands of times"
});

abbieStephenson.seasons.push(
    createSeasonPlayer({
        season: "2026/27",
        number: 24,
        position: "Left Wing",
        goals: 0,
        assists: 0,
        penaltyMinutes: 0
    })
);

const chloeStephenson = createPlayer({
    name: "Chloe Stephenson",
    favouriteSharkFact: "Sharks have been around longer than dinosaurs"
});

chloeStephenson.seasons.push(
    createSeasonPlayer({
        season: "2026/27",
        number: 18,
        position: "Right Wing",
        goals: 0,
        assists: 0,
        penaltyMinutes: 0
    })
);

const scottBrown = createPlayer({
    name: "Scott Brown",
    favouriteSharkFact: "Sharks can swim up to 25 miles per hour"
});

scottBrown.seasons.push(
    createSeasonPlayer({
        season: "2026/27",
        number: 5,
        position: "Centre",
        goals: 0,
        assists: 0,
        penaltyMinutes: 0
    })
);

const roster = [
    alexPickering,
    nathanMilne,
    abbieStephenson,
    chloeStephenson,
    scottBrown
];

const { savePlayers } = require("./players");

savePlayers(roster);

console.log("Player migration complete.");