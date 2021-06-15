

const status = document.querySelector('.status');

let gameActive = true;

 let currentPlayer = "X";



 let gameState = ["", "", "", "", "", "", "", "", ""];

 const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
 ];

 const winningMessage = () => `Player ${currentPlayer} has won!`;

 const drawMessage = () => `Game ended in a draw`;

 const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

 status.innerHTML = currentPlayerTurn();


 function handelCellPlayed(clickedCell, clickedCellIndex){
    //  console.log("game state before",gameState);
    gameState[clickedCellIndex] = currentPlayer;

    // console.log("game state after", gameState);
    clickedCell.innerHTML = currentPlayer;

 }

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
   
    status.innerHTML = currentPlayerTurn();
}



 function handleResultValidation(){
    let roundWon = false;

    for(let i=0; i< winningConditions.length; i++){
        const winningCondition = winningConditions[i];

        let a= gameState[winningCondition[0]];
        let b= gameState[winningCondition[1]];
        let c= gameState[winningCondition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }
        if(a === b && b ===c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        status.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // handle draw conditions
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        status.innerHTML = drawMessage();
        gameActive = false;
        return;

    }

    handlePlayerChange();
 }

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    // console.log(clickedCell);
    const clickedCellIndex = clickedCell.getAttribute("id");
    // console.log(clickedCellIndex);     

    if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

    // if everyThing is fine
// change the state of cell
//
   handelCellPlayed(clickedCell, clickedCellIndex);
   handleResultValidation();
}


function handleRestartGame(){
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".grid-item").forEach((cells) => cells.innerHTML = "");
}

 
 document.querySelectorAll(".grid-item").forEach((cells) => cells.addEventListener("click", handleCellClick));

 document.querySelector(".restart").addEventListener("click", handleRestartGame);
