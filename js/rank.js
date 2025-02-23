function loadRank() {
    var rank = localStorage.getItem("rank");
    if (rank === null) {
        console.error('Rank non trovato, impostato a 100');
        rank = 100;
        localStorage.setItem("rank", rank);
    } else {
        rank = parseInt(rank, 10);
        console.log(`%cLOAD:%cRank rilevato: ` + rank, 'color: green;', 'color: white');
    }
    return rank;
}

function saveRank() {
    var rank = document.getElementById('rank').value;
    localStorage.setItem("rank", rank);
}

function setRank(rank) {
    console.log(`%cSET:%cImpostando rank a: `+ rank, 'color: yellow;', 'color: white');
    upRank(0, rank);
}

function selectRank(rank) {
    var rankElement = document.getElementById('difficulty-container');
    var betElement = document.getElementById('bet-container');

    if (isNaN(rank)) {
        console.error('Rank non valido');
    }

    rank = Math.floor(rank / 100)

    if(rank < 2)
        rank = 1;
    else if(rank < 4)
        rank = 2;
    else if(rank < 8)
        rank = 3;
    else if(rank < 100)
        rank = 4;
    else
        console.error('Rank non valido !');
    var select = [`
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
            </select>
            `, `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" >Beta</option>
            </select>
            `, `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" >Beta</option>
                <option value="3">Alpha</option>
            </select>
            `, `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" >Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `];

    let optionsCount = rankElement.querySelectorAll("#difficulty option").length;
    if (optionsCount === rank) {
        console.log("%cRank " + optionsCount + " già impostato", "background: green; color: white;opacity: 0.8;border-radius: 5px;padding: 2px;");
        saveRank();
        return;
    }

    rankElement.innerHTML = select[rank - 1];

    let maxBet = [5, 10, 20, 50][rank - 1] || 5;
    betElement.innerHTML = `<input type="number" name="amount" id="betAmount" class="button" value="1" min="1" max="${maxBet}" placeholder="1">`;
    saveRank();
}

function upRank(amount, set) {
    var rank;
    if (!isNaN(set) && set != 0) {
        rank = set;
    } else {
        rank = loadRank() + amount;
    }

    document.getElementById('rank').value = rank;

    if (rank < 200 && rank >= 100) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Skibidi Toilet</h5><input type="range" name="rank" id="rank" min="100" max="200" value="${rank}" disabled><h5 class="rank-title">Beta</h5>`;
    } else if (rank < 400 && rank >= 200) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Beta</h5><input type="range" name="rank" id="rank" min="200" max="400" value="${rank}" disabled><h5 class="rank-title">Alpha</h5>`;
    } else if (rank < 750 && rank >= 400) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Alpha</h5><input type="range" name="rank" id="rank" min="400" max="800" value="${rank}" disabled><h5 class="rank-title">Sigma</h5>`;
    } else if (rank > 750) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Sigma</h5><input type="range" name="rank" id="rank" min="800" max="10000" value="${rank}" disabled><h5 class="rank-title">Gambler master</h5>`;
    }

    document.getElementById('rank-value').innerHTML = rank;
    selectRank(rank);
}