let currentNumber;
let movesLeft;

function generateRandomNumber() {
    const digits = [];
    while (digits.length < 6) {
        const digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return parseFloat(digits.join(''));
}

function updateDisplay() {
    document.getElementById('game-display').value = currentNumber.toString();
}

function performOperation() {
    const input = document.getElementById('input-number').value;
    const operation = document.getElementById('operation').value;

    if (input.length !== 2 || isNaN(input) || input < 10 || input > 99) {
        alert("Please enter a valid 2-digit number!");
        return;
    }

    const number = parseFloat(input);

    switch (operation) {
        case 'subtract':
            currentNumber -= number;
            break;
        case 'add':
            currentNumber += number;
            break;
        case 'multiply':
            currentNumber *= number;
            break;
        case 'divide':
            if (number === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            currentNumber /= number;
            break;
    }

    movesLeft--;

    updateDisplay();
    updateStatus();

    if (currentNumber < 0) {
        alert("Game Over! You went below 0.");
        disableInput();
    }

    if (currentNumber === 0) {
        alert("Congratulations! You won!");
        disableInput();
    }

    if (movesLeft === 0) {
        if (currentNumber === 0) {
            alert("Congratulations! You won!");
        } else {
            alert("Game Over! You couldn't reach 0.");
        }
        disableInput();
    }
}

function updateStatus() {
    const statusMessage = `You have ${movesLeft} moves left.`;
    document.getElementById('status-message').textContent = statusMessage;
}

function disableInput() {
    document.getElementById('input-number').disabled = true;
    document.getElementById('operation').disabled = true;
    document.querySelector('.btn').disabled = true;
}

function resetGame() {
    currentNumber = generateRandomNumber();
    movesLeft = 4;
    document.getElementById('input-number').disabled = false;
    document.getElementById('operation').disabled = false;
    document.querySelector('.btn').disabled = false;
    updateDisplay();
    updateStatus();
    document.getElementById('input-number').value = '';
}

window.onload = resetGame;
