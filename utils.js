function getDiceHolders(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(() => `<div class="place-holder"></div>`)
    .join("");
}

function getRandomDices(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(() => Math.floor(Math.random() * 6) + 1);
}

function calcHarm(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

export { getDiceHolders, getRandomDices, calcHarm };
