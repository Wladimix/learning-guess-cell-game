// |===================================================ЗАДАНИЕ====================================================|
// |--------------------------------------------------------------------------------------------------------------|
// | Реализуйте игру "угадай ячейку".                                                                             |
// | В этой игре будет дана таблица 10 на 10. Компьютер случайным образом запоминает 10 ячеек из этой таблицы.    |
// | Игроку нужно кликать на клетки пока он не найдет все загаданные компьютером ячейки.                          |
// |==============================================================================================================|

const table = document.querySelector('div.container div.panelWithCells table');
const panelWithMessages = document.querySelector('div.container div.panelWithMessages');
let numberOfUnsolvedCells; // Счётчик неразгаданных ячеек. Обнуляется в начале игры.

// Массив индексов ячеек.
let indexesOfCells = [];
for (let i = 0; i < 100; i++) {
    indexesOfCells.push(i);
};

createStartingCells();
panelWithMessages.addEventListener('click', generalFunction);
panelWithMessages.textContent = 'Нажмите, чтобы начать игру.';

// Создание начального экрана с нединамичными ячейками.
function createStartingCells() {
    for (i = 0; i <= 9; i++) {
        const tr = document.createElement('tr');
    
        for (j = 0; j <= 9; j++) {
            let td = document.createElement('td');
            let index = Number(String(j) + String(i));
    
            td.style.border = '2px solid black';
            td.classList.add(index);
    
            tr.appendChild(td);
        };
    
        table.appendChild(tr);
    };
};

// Основная функция, создающая ячейки с индексами из массива.
// При помощи рандомного массива выбираются загаданные ячейки.
function generalFunction() {
    table.textContent = '';
    numberOfUnsolvedCells = 10;
    panelWithMessages.textContent = 'Найдите 10 загаданных ячеек.';
    panelWithMessages.removeEventListener('click', generalFunction);

    let indexesOfHiddenCells = createIndexesOfHiddenCells();10;

    for (i = 0; i <= 9; i++) {
        const tr = document.createElement('tr');
    
        for (j = 0; j <= 9; j++) {
            let td = document.createElement('td');
            let index = Number(String(j) + String(i));
    
            td.style.border = '2px solid black';
            td.classList.add(index);
            td.classList.add('transition');
            td.addEventListener('click', colorChangeToRed);

            for (let randomIndex of indexesOfHiddenCells) {
                if (Number(randomIndex) === index) {
                    td.removeEventListener('click', colorChangeToRed);
                    td.addEventListener('click', colorChangeToGreen);
                    break;
                }
            };
    
            tr.appendChild(td);
        };
    
        table.appendChild(tr);
    };
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function createIndexesOfHiddenCells() {
    let indexesOfHiddenCells = [];

    while (indexesOfHiddenCells.length < 10) {
        let randomIndex = getRandomInt(0, 100);
        
        for (let elem of indexesOfCells) {
            if (Number(elem) === randomIndex) {
                indexesOfCells[elem] = undefined;
                indexesOfHiddenCells.push(randomIndex);
                break;
            }
        };
    };

    return indexesOfHiddenCells;
};

function colorChangeToGreen() {
    this.classList.add('green');
    numberOfUnsolvedCells--;

    if (numberOfUnsolvedCells > 0) {
        panelWithMessages.textContent = `Ячеек осталось: ${numberOfUnsolvedCells}`;
    } else {
        panelWithMessages.textContent = 'Вы нашли все ячейки! Нажмите, чтобы сыграть ещё раз.';
        panelWithMessages.addEventListener('click', generalFunction);
    }

    this.removeEventListener('click', colorChangeToGreen);
};

function colorChangeToRed() {
    this.classList.add('red');
};
