window.onload = function() {
    updateBalance();
    checkMidnight();
    setInterval(checkMidnight, 60000); // Check every minute
};

function loadCredits() {
    var token = localStorage.getItem('credits');
    if (token)
        return parseInt(localStorage.getItem('credits'), 10) || 100;
    else {
        var credits = 100;
        saveCredits(credits);
        return credits;
    }
}

function saveCredits(credits) {
    localStorage.setItem('credits', credits);
}

function addCredits(amount) {
    var credits = loadCredits();
    credits += amount;
    saveCredits(credits);
    updateBalance();
    return credits;
}

function setCredits(amount) {
    var credits = loadCredits();
    credits = amount;
    saveCredits(credits);
    updateBalance();
    return credits;
}

function rmCredits(amount) {
    var credits = loadCredits();
    credits -= amount;
    saveCredits(credits);
    updateBalance();
    return credits;
}

function updateBalance() {
    var credits = loadCredits();
    document.getElementById('balance').innerHTML = credits;
    console.log("Crediti aggiornati a:", credits);
}

function display(message) {
    document.getElementById('alert').innerHTML = message;
}

function spin() {
    var betAmount = parseInt(document.getElementById('betAmount').value, 10);
    if (isNaN(betAmount) || betAmount <= 0) {
        display('Seleziona una scommessa valida.');
        return;
    }

    var credits = loadCredits();
    if (betAmount > credits) {
        display('Crediti insufficienti.');
        return;
    }

    rmCredits(betAmount);

    var reels = document.querySelectorAll('.reel');
    reels[0].classList.add('spin-left');
    reels[1].classList.add('spin-right');
    reels[2].classList.add('spin-left');

    setTimeout(() => {
        var result = spinReels();
        displayResult(result);

        var winnings = calculateWinnings(result, betAmount);
        if (winnings > 0) {
            addCredits(winnings);
            display('Hai vinto ' + winnings + ' crediti! Vedi che il gambling funziona?');
        } else {
            display('Hai perso, ma non è finito il gambling!');
        }

        reels[0].classList.remove('spin-left');
        reels[1].classList.remove('spin-right');
        reels[2].classList.remove('spin-left');
    }, 1000);
}

function spinReels() {
    var difficulty = parseInt(document.getElementById('difficulty').value, 10);
    var reels = [];
    switch (difficulty) {
        case 1:
            reels = ['🍒', '🍋', '🍊', '🍉', '🍇'];
            break;
        case 2:
            reels = ['🍒', '🍋', '🍊', '🍉', '🍇', '⭐', '🔔', '7️⃣'];
            break;
        case 3:
            reels = ['🍒', '🍋', '🍊', '🍉', '🍇', '⭐', '🔔', '7️⃣', '🍓', '🍍', '🍌', '🍈'];
            break;
        case 4:
            reels = ['🍒', '🍋', '🍊', '🍉', '🍇', '⭐', '🔔', '7️⃣', '🍓', '🍍', '🍌', '🍈', '🍏', '🍐', '🍑', '🍒', '🍋', '🍊', '🍉', '🍇'];
            break;
        default:
            reels = ['🍒', '🍋', '🍊', '🍉', '🍇'];
    }
    var result = [];
    for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(Math.random() * reels.length);
        result.push(reels[randomIndex]);
    }
    return result;
}

function displayResult(result) {
    document.getElementById('reel1').innerHTML = result[0];
    document.getElementById('reel2').innerHTML = result[1];
    document.getElementById('reel3').innerHTML = result[2];
}

function calculateWinnings(result, betAmount) {
    var difficulty = parseInt(document.getElementById('difficulty').value, 10);
    var multiplier = 1;

    switch (difficulty) {
        case 1:
            multiplier = 1;
            break;
        case 2:
            multiplier = 2;
            break;
        case 3:
            multiplier = 3;
            break;
        case 4:
            multiplier = 4;
            break;
        default:
            multiplier = 1;
    }

    if (result[0] === result[1] && result[1] === result[2]) {
        if (result[0] === '7️⃣') {
            return betAmount * 10 * multiplier;
        }
        return betAmount * 5 * multiplier;
    } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        return betAmount * 2 * multiplier;
    }
    return 0;
}

function checkMidnight() {
    var now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        addCredits(20);
        display('Hai ricevuto 20 crediti per il nuovo giorno!');
    }
}