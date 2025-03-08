import { database, ref, set, onValue, auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

let playerId;
let gameRef;

// Wait for authentication before setting playerId
onAuthStateChanged(auth, (user) => {
    if (user) {
        playerId = user.uid;
        document.getElementById("player-id").innerText = `Your ID: ${playerId}`;
        gameRef = ref(database, "game");

        // Start listening for opponent moves
        listenForMoves();
    } else {
        console.error("User is not authenticated.");
    }
});

function makeChoice(choice) {
    if (!playerId) {
        console.error("Player ID not set. Wait for authentication.");
        return;
    }

    set(ref(database, `game/${playerId}`), { choice: choice });
}

function listenForMoves() {
    onValue(gameRef, (snapshot) => {
        let data = snapshot.val();
        if (data && Object.keys(data).length === 2) {
            let players = Object.keys(data);
            let choice1 = data[players[0]].choice;
            let choice2 = data[players[1]].choice;

            let winner = determineWinner(choice1, choice2);
            document.getElementById("winner").innerText = winner;
        }
    });
}

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