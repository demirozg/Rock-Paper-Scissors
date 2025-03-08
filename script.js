import { database, ref, set, onValue } from "./firebase-config.js";

let playerId = Math.random().toString(36).substr(2, 5);
document.getElementById("player-id").innerText = `Your ID: ${playerId}`;

let gameRef = ref(database, "game");

// Function to make a choice
function makeChoice(choice) {
    set(ref(database, `game/${playerId}`), { choice: choice });
}

// Listen for opponent choices
onValue(gameRef, (snapshot) => {
    let data = snapshot.val();
    if (data) {
        let players = Object.keys(data);
        
        if (players.length === 2) {
            let player1 = players[0];
            let player2 = players[1];

            let choice1 = data[player1].choice;
            let choice2 = data[player2].choice;

            let winner = determineWinner(choice1, choice2);
            document.getElementById("winner").innerText = winner;
        }
    }
});

// Function to determine the winner
function determineWinner(choice1, choice2) {
    if (choice1 === choice2) return "It's a tie!";
    if ((choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "scissors" && choice2 === "paper") ||
        (choice1 === "paper" && choice2 === "rock")) {
        return "You win!";
    }
    return "You lose!";
}

window.makeChoice = makeChoice;
