import Character from "./Character.js";
import charactersData from "./data.js";

/* declare html elements */
const get = (element) => document.getElementById(element);
const attackBtn = get("attack-btn");
let isWait = false;

/* change monster */
const allMonster = ["orc", "goblin", "demon"];

function getMonster() {
  const newMonster = allMonster.shift();

  return newMonster ? new Character(charactersData[newMonster]) : {};
}

/* instantiate objects */
const wizard = new Character(charactersData.hero);
let monster = getMonster();

/* attck btn functionality*/
attackBtn.addEventListener("click", function () {
  if (!isWait) {
    wizard.getDiceHtml();
    monster.getDiceHtml();
    wizard.calcHealth(monster.diceArray);
    monster.calcHealth(wizard.diceArray);
    render();

    if (wizard.dead) {
      if (monster.dead && allMonster.length > 0) {
        monster = getMonster();
        render();
      }
      endGame();
    } else if (monster.dead) {
      if (allMonster.length > 0) {
        isWait = true;
        setTimeout(function () {
          monster = getMonster();
          render();
          isWait = false;
        }, 1000);
      } else {
        endGame();
      }
    }
  }
});

/* end game case */
function endGame() {
  isWait = true;
  setTimeout(() => {
    // in case both characters are dead
    let message = ``;
    if (wizard.health === 0 && monster.health === 0) {
      message = `
    <div class='endMessage'>
      <h1>All Creatures are dead!💀</h1>
    </div>`;
    }
    // in case wizard has more health than 0 and monster health is 0
    if (wizard.health > 0 && monster.health === 0) {
      message = `
    <div class='endMessage'>
      <h1>Wizard Wins!🧙‍♂️</h1>
    </div>`;
    } else if (wizard.health === 0 && monster.health > 0) {
      message = `
    <div class='endMessage'>
      <h1>Monsters Win!👺</h1>
    </div>`;
    }
    document.body.innerHTML = message;
  }, 2000);
}

/* render data on the page */
function render() {
  get("hero").innerHTML = wizard.getHtml();
  get("monster").innerHTML = monster.getHtml();
}

render();
