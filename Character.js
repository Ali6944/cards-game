import { getDiceHolders, getRandomDices, calcHarm } from "./utils.js";

/* create class to get data we need */
class Character {
  constructor(data) {
    Object.assign(this, data);
    /* get placeholder */
    this.diceHtml = getDiceHolders(this.diceCount);
    this.totalHealth = this.health;
  }

  /* calculate the harm */
  calcHealth(arr) {
    this.health -= calcHarm(arr);
    if (this.health < 0) {
      this.dead = true;
      this.health = 0;
    }
  }

  /* measure healthBar */
  healthBar() {
    return (this.health / this.totalHealth) * 100;
  }

  /* display random dices */
  getDiceHtml() {
    this.diceArray = getRandomDices(this.diceCount);
    this.diceHtml = this.diceArray
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  }

  getHtml() {
    const { title, avatar, health, diceHtml } = this;
    const healthRatio = this.healthBar();
    return `
    <div class="top-section">
      <h2 class="name">${title}</h2>
      <div class="img-container">
        <img src="${avatar}" alt="wizard photo" />
      </div>
      <p>Health: <span class="bold">${health}</span></p>
      <div class="health-bar-container">
        <div class="health-bar" style="width: ${healthRatio}%"></div>
      </div>
    </div>
    <div class="dice-container">
      ${diceHtml}
    </div>
    `;
  }
}

export default Character;
