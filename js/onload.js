window.onload = function() {
    //rank.js
    loadRank();
    upRank(0);
    
    //script.js
    updateBalance();
    checkMidnight();
    setInterval(checkMidnight, 60000); 
};