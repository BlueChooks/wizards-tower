function checkLevelCleared(levelNum) {
    return JSON.parse(localStorage.getItem(`level-${levelNum}-clear`));
}

function clearLevel(levelNum) {
    localStorage.setItem(`level-${levelNum}-clear`, 'true');
}