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
    if (credits - amount < 0) {
        display('Crediti insufficienti.');
        return credits;
    }
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
    console.clear();

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
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 4) {
        console.error('Difficoltà non valida.');
        return [];
    }

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
    var multiplier = parseInt(document.getElementById('difficulty').value, 10);
    var total = 0;
    var done = 0;
    var xp = 0;

    if (result[0] === result[1] && result[1] === result[2]) {
        if (result[0] === '7️⃣') {
            done = 4;
            total = betAmount * 10 * multiplier;
            xp = 8;
        }
        done = 3;
        total = betAmount * 5 * multiplier;
        xp = 5;
    } else if(result[0] === result[1] || result[1] === result[2]){
        done = 2;
        total = betAmount * 2 * multiplier;
        xp = 2;
    } else if (result[0] === result[2]) {
        done = 1;
        total = betAmount * 1 * multiplier;
        xp = 1;
    } else if(result[0] != result[1] && result[1] != result[2]){
        done = 0;
        if(multiplier == 4)
            xp = -1;
        else
            xp = 0;
    }

    if(total > 0 && done > 0){
        display(`+ ${total} crediti ! <br> + ${xp} xp !`);
    }

    addXP(xp, multiplier);
    justDone(done);

    return total;
}

function addXP(xp, multiplier){
    var rank = loadRank();
    console.log("Xp: " + loadRank());

    xp < 0 ? xp = xp * (5 - Math.floor(rank / 100)) : xp = xp * (5 - Math.floor(rank / 100)) * multiplier;

    console.log("Xp ottenuti: " + xp);
    upRank(xp);
}

function justDone(done){
    var row = document.getElementById(`r${done}`);
    var lines = document.querySelectorAll(`.row`);

    lines.forEach(line => {
        line.classList.remove(`done`);
    });

    row.classList.add(`done`);
}

function checkMidnight() {
    var now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        addCredits(20);
        display('Hai ricevuto 20 crediti per il nuovo giorno!');
    }
}