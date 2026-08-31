Whitley Bay Sharks — Team Manager

A JavaScript command-line application for managing an ice hockey team's players, games and season statistics. Built as part of a self-directed JavaScript retraining project, using Node.js with no external dependencies.

Features

Roster

View team roster (sorted by squad number)
Find a player by number
Edit a player's details

Games

Record a new game, including per-player stats (goals, assists, penalty minutes)
View all games, or filter by home/away
View wins, losses and draws
Search games
Edit existing game information

Stats

View team-wide season statistics (goals, assists, points, penalty minutes)
Automatically identify the season's top scorer

Data

Persistent JSON storage — all data survives between sessions
Technologies
JavaScript (Node.js)
Node's built-in readline module for the interactive CLI
Node's built-in fs module for file-based JSON persistence
Node's built-in test runner (node:test, node:assert) — no external test framework
Project structure
File	Responsibility
interactive.js	Main menu loop
dataInput.js	"Record New Data" submenu (add player, edit player)
gamesInteractive.js	"Games" submenu (view/search/filter games)
gameInput.js	Recording a new game sheet
gameEdit.js	Editing an existing game
game.js	Core logic: creating games, applying stats to players
games.js	Loading/saving data/games.json
players.js	Loading/saving data/players.json
roster.js	Pure roster logic (find player, adjust stats)
stats.js	Team-level statistics calculations
display.js	Console output formatting
config.js	Shared constants (e.g. current season)
Getting started
npm install
npm start
Running tests
npm test

Tests cover the pure logic functions (roster.js, stats.js, game.js) using Node's built-in test runner. Functions that write to disk (like savePlayers) are mocked out during tests using t.mock.method(...), so running the test suite never modifies the real data in data/.

Challenges & learnings

The trickiest bug in this project didn't throw any errors — it just quietly failed. Player stats entered through the "Add Game Sheet" flow looked correct while the app was running, but never actually stuck: team stats and individual player profiles wouldn't reflect them, especially noticeable after restarting the app.

Tracing it through the code, the cause turned out to be in recordGame (in game.js). It correctly updated each player's goals, assists and penalty minutes in memory, but never called savePlayers() to persist those changes to data/players.json. Recording a new game did save the game itself, since addGame() writes to data/games.json — but the player-side update was silently lost the moment the process ended. The fix was a single missing function call, but finding it meant comparing recordGame against a similar function, editGameInteractive (in gameEdit.js), which handled the same kind of update correctly and did call savePlayers() — that comparison is what made the gap obvious.

Fixing the bug going forward wasn't the whole job, though. Several games had already been recorded before the fix, so their player stats had never made it into players.json at all — the live data and the game history had quietly drifted out of sync. Reconstructing the correct totals meant writing a one-off script to recompute each player's season stats directly from the games they'd played in, rather than trusting whatever was currently saved.

That backfill also surfaced a second, unrelated issue: one player had been given a temporary squad number early on, which was later changed — but two already-recorded games still referenced the old number. Since no player in the roster matched that number anymore, those two games' stats had nowhere to go and were being silently dropped from every recalculation. Fixing it meant relinking the historical game records to the player's current number and manually reconciling stats that had been entered by hand separately from any recorded game.

The main lesson from all of this: a bug that doesn't throw an exception can be more dangerous than one that does, because nothing forces you to notice it. It's also why I added test coverage afterward, including for recordGame itself — with the file-writing side of it mocked out during tests, so the test suite verifies the logic without ever touching the real season data.

Possible future improvements
Sort games chronologically by date (currently stored as DD-MM-YYYY strings, which need converting before they sort correctly)
Extend test coverage to the file-loading/saving functions in players.js and games.js


License

MIT