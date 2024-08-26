let currentValue = 0;
let turns = 0;
let dice1Value, dice2Value;

const operations = {
    1: '+',
    2: '-',
    3: 'x',
    4: '/',
    5: 'x',
    6: '+'
};

function rollDice() {
    dice1Value = Math.floor(Math.random() * 6) + 1;
    dice2Value = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').setAttribute('data-value', dice1Value);
    document.getElementById('dice2').setAttribute('data-value', dice2Value);

    document.getElementById('roll-btn').style.display = 'none';
    document.getElementById('dice1-btn').style.display = 'inline-block';
    document.getElementById('dice2-btn').style.display = 'inline-block';

    document.getElementById('operation-result').textContent = "Choose which dice to use as the number.";
}

function selectDice(selectedDice) {
    let number, operation;

    if (selectedDice === 2) {
        number = dice1Value;
        operation = operations[dice2Value];
    } else {
        number = dice2Value;
        operation = operations[dice1Value];
    }

    applyOperation(number, operation);
}

function applyOperation(number, operation) {
    if (operation === '+') {
        currentValue += number;
    } else if (operation === '-') {
        currentValue -= number;
    } else if (operation === 'x') {
        currentValue *= number;
    } else if (operation === '/') {
        currentValue /= number;
    }

    turns++;

    document.getElementById('current-value').textContent = currentValue;
    document.getElementById('turns').textContent = turns;

    if (checkVictory()) {
        document.getElementById('operation-result').textContent = `Victory! You reached 1001 in ${turns} turns!`;
    } else if (currentValue > 1001 || currentValue < 0) {
        document.getElementById('operation-result').textContent = "You went out of bounds. Game over.";
    } else {
        document.getElementById('operation-result').textContent = `Applied ${operation} ${number}. New value: ${currentValue}.`;

        document.getElementById('roll-btn').style.display = 'inline-block';
        document.getElementById('dice1-btn').style.display = 'none';
        document.getElementById('dice2-btn').style.display = 'none';
    }
}

function checkVictory() {
    return currentValue === 1001;
}

function resetGame() {
    currentValue = 0;
    turns = 0;

    document.getElementById('current-value').textContent = currentValue;
    document.getElementById('turns').textContent = turns;
    document.getElementById('dice1').setAttribute('data-value', '');
    document.getElementById('dice2').setAttribute('data-value', '');
    document.getElementById('roll-btn').style.display = 'inline-block';
    document.getElementById('dice1-btn').style.display = 'none';
    document.getElementById('dice2-btn').style.display = 'none';
    document.getElementById('operation-result').textContent = "Roll the dice to start!";
}

window.onload = resetGame;