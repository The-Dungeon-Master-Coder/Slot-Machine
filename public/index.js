
console.log("foo");

const getRandomIndex = () => Math.floor(Math.random() * 16);
const slotIcons = [
  "cherries",
  "plums",
  "bells",
  "clovers",
  "lemons",
  "bars",
  "apples",
  "hearts",
  "grapes",
  "oranges",
  "watermelons",
  "horseshoes",
  "coins",
  "sevens",
  "diamonds",
  "wilds"
];

let wallet = 100;

const chargeAccount = (price) => {
  if (price > wallet) {
    throw new Error("You are broke lmao");
  }
  wallet -= price;
};

const payAccount = (price) => {
  wallet += price;
};

const getMultiplier = (randomIndexes) => {
  return randomIndexes[0] + 2;
};

const costToPlay = 5;

const spinMachine = () => {
  const randomIndexes = [getRandomIndex(), getRandomIndex(), getRandomIndex()];
  const isWinner =
    randomIndexes[0] === randomIndexes[1] &&
    randomIndexes[1] === randomIndexes[2];
  if (isWinner) {
    payAccount(costToPlay * getMultiplier(randomIndexes));
  }

  document.getElementById("slot").innerHTML = `
<div>
  <div class="slot-icon ${slotIcons[randomIndexes[1]]}"></div>
  <div class="slot-icon ${slotIcons[randomIndexes[0]]}"></div>
  <div class="slot-icon ${slotIcons[randomIndexes[2]]}"></div>
  <div>Money remaining: $${wallet} </div>
  <div>${isWinner ? "Winner!" : "Try Again!"}</div>
</div>
  `;
};

const userIsBigDumb = (errorMessage) => {
  document.getElementById("slot").innerHTML = `
<div>
  ${errorMessage ? `<div> ${errorMessage} </div>` : ""}
  <button id="rebuy">rebuy?</button>
</div>`;
};

const refreshSlot = (chargeUser = true) => {
  try {
    if (chargeUser) {
      chargeAccount(costToPlay);
    }
    spinMachine();
  } catch (error) {
    userIsBigDumb(error.message);
  }
};

const rebuy = (e) => {
  if (e.target.id === "rebuy") {
    wallet = 100;
    refreshSlot(false);
  }
};

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <div class="slot-icon cherries"></div>
  <div class="slot-icon plums"></div>
  <div class="slot-icon bells"></div>
</div>
<div id="button"></div>
`;

refreshSlot();

const button = document.createElement("button");
button.innerHTML = "Click to Spin!";
button.addEventListener("click", refreshSlot);
document.getElementById("button").appendChild(button);

document.body.addEventListener("click", rebuy);
