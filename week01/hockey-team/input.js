function askForNumber(rl, question, callback) {
    rl.question(question, (answer) => {
        const number = Number(answer);

        if (isNaN(number)) {
            console.log ("Invalid input. Please enter a number.");
            askForNumber(rl, question, callback);
        return;
        }
        callback(number);
    });
}

module.exports = {
    askForNumber
};
