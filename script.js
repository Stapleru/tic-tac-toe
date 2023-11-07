const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => game.start())

function test(e, index){
    console.log(`you clicked ${index} cell`)
}

function createPlayer(name, marker) {
    return { name, marker };
};

const gameboard = (function () {
    let gameboard = ["", "", "",
                     "", "", "",
                     "", "", ""];
    //logic for rendering gameboard
    const render = () => {
        const grid = document.querySelector('.gameboard')
        gameboard.forEach((mark, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', (e) => {
                game.clickHandler(index);
            });
            grid.appendChild(cell);
        });
    };
    return { render };
})();

const game = (function(){
    //logic for the game itself
    const start = () => {
        let name1 = document.querySelector('#player1').value;
        let name2 = document.querySelector('#player2').value;

        if(name1 == '' || name2 == '')
            alert('please enter both names');
        else {
            startBtn.textContent = 'Restart';
            let players = [createPlayer(name1, 'X'), createPlayer(name2, 'O')];
            gameboard.render();
        }
    }

    const clickHandler = (index) => {
        console.log(`you clicked ${index} cell`)
    };

    return { start, clickHandler }
})();
   