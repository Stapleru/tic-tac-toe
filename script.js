const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => game.start())

function test(e, index){
    console.log(`you clicked ${index} cell`)
}

function createPlayer(name, marker) {
    return { name, marker };
};

const gameboard = (function () {
    let board =     ["", "", "",
                     "", "", "",
                     "", "", ""];
    //logic for rendering gameboard
    const render = () => {
        const grid = document.querySelector('.gameboard')
        grid.innerHTML = '';
        board.forEach((mark, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[index];
            cell.addEventListener('click', (e) => {
                game.clickHandler(board, index);
            });
            grid.appendChild(cell);
        });
    };

    const clear = () => {
        board = ["", "", "",
                "", "", "",
                "", "", ""];
    }
    return { render, clear };
})();

const game = (function(){
    let turn = 0;
    let playerOneTurn = true;
    let players = [];
    //logic for the game itself
    const start = () => {
        let name1 = document.querySelector('#player1').value;
        let name2 = document.querySelector('#player2').value;

        if(name1 == '' || name2 == '')
            alert('please enter both names');
        else {
            startBtn.textContent = 'Restart';
            players = [createPlayer(name1, 'X'), createPlayer(name2, 'O')];
            gameboard.clear();
            gameboard.render();
            updatePlayerText();
        }
    }

    const gameOver = () => {
        gameboard.clear();
        gameboard.render();
        turn = 0;
    }

    const updatePlayerText = () => {
        const turn = document.querySelector('.turn')
        playerOneTurn ? turn.textContent = `${players[0].name}'s ${players[0].marker} turn`
                        : turn.textContent = `${players[1].name}'s ${players[1].marker} turn`
    }

    const checkWin = (board, player) => {
        turn++;
        let currMarker = player.marker;
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        combs.forEach((comb) =>{
            if(board[comb[0]] == currMarker &&
               board[comb[1]] == currMarker &&
               board[comb[2]] == currMarker
            ) {
                alert(`${player.name} WON!`);
                gameOver()
            }
        })
        if (turn == 9){
            alert("IT'S A TIE!")
            gameOver();
        }
    }

    const clickHandler = (board, index) => {
        if(board[index] == ''){
            let currPlayer;
            if (playerOneTurn)
                currPlayer = 0;
            else
                currPlayer = 1;
            playerOneTurn = !playerOneTurn;
            board[index] = players[currPlayer].marker;
            gameboard.render();
            checkWin(board, players[currPlayer]);
            updatePlayerText();
        }
    };

    return { start, clickHandler }
})();
   