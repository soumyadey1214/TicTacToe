console.log("Welcome to Tic Tac Toe");
let audioTurn = new Audio("multimedia/click.WAV");
let audioGameOver = new Audio("multimedia/win-buzzar.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check the Win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    let draw = true;

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " congratulations!! You Won the Match";
            isgameover = true;
            audioGameOver.play(); 
            document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
                "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            draw = false;
        }
    });

    // Check for a draw
    if (draw) {
        let isDraw = Array.from(boxtext).every((box) => box.innerText !== "");
        if (isDraw) {
            document.querySelector(".info").innerText = "It's a Draw!";
            isgameover = true;
            audioGameOver.play(); 
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (!isgameover && boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn For" + turn;
    document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width = "0px";
});
