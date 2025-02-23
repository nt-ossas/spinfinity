function loadRank() {
    var rank = localStorage.getItem("rank");
    if (rank === null) {
        console.error('Rank non trovato, impostato a 100');
        rank = 100;
        localStorage.setItem("rank", rank);
    } else {
        rank = parseInt(rank, 10);
        console.log(`Rank rilevato: ` + rank);
    }
    setRank(rank);
    return rank;
}

function saveRank() {
    var rank = document.getElementById('rank').value;
    localStorage.setItem("rank", rank);
}

function setRank(rank) {
    console.log(`Impostando rank a: ${rank}`);
    upRank(0, rank);
}

function selectRank(rank) {
    var rankElement = document.getElementById('difficulty-container');

    if (isNaN(rank)) {
        console.error('Rank non valido');
    }

    switch (Math.floor(rank / 100)) {
        case 1:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
            </select>
            `;
            break;
        case 2:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
            </select>
            `;
            break;
        case 3:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
            </select>
            `;
            break;
        case 4:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        case 5:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        case 6:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        case 7:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        case 8:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        case 9:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1">Skibidi Toilet</option>
                <option value="2" selected>Beta</option>
                <option value="3">Alpha</option>
                <option value="4">Sigma</option>
            </select>
            `;
            break;
        default:
            rankElement.innerHTML = `
            <select name="difficulty" id="difficulty" class="button">
                <option value="1" selected>Skibidi Toilet</option>
            </select>
            `;
    }
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
    } else if (rank < 300 && rank >= 200) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Beta</h5><input type="range" name="rank" id="rank" min="200" max="300" value="${rank}" disabled><h5 class="rank-title">Alpha</h5>`;
    } else if (rank < 400 && rank >= 300) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Alpha</h5><input type="range" name="rank" id="rank" min="300" max="400" value="${rank}" disabled><h5 class="rank-title">Sigma</h5>`;
    } else if (rank > 400) {
        document.getElementById('rank-bar').innerHTML = `<h5 class="rank-title">Sigma</h5><input type="range" name="rank" id="rank" min="400" max="5000" value="${rank}" disabled><h5 class="rank-title">Gambler master</h5>`;
    }

    document.getElementById('rank-value').innerHTML = rank;
    selectRank(rank);
}