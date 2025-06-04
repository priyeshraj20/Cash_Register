// Global variables
let price = 0;
let cid = [];

// DOM Elements
const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");

// Currency map
const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// Format number to 2 decimals
const round = (num) => Math.round(num * 100) / 100;

const handleTransaction = () => {
  const cash = Number(cashInput.value);
  const changeDue = round(cash - price);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    displayChangeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }

  let change = [];
  let totalCid = round(cid.reduce((acc, curr) => acc + curr[1], 0));
  let remainingChange = changeDue;

  const reversedCid = [...cid].reverse();

  for (let [unit, amount] of reversedCid) {
    let unitValue = currencyUnit[unit];
    let available = amount;
    let used = 0;

    while (remainingChange >= unitValue && available >= unitValue) {
      remainingChange = round(remainingChange - unitValue);
      available = round(available - unitValue);
      used = round(used + unitValue);
    }

    if (used > 0) {
      change.push([unit, used]);
    }
  }

  const totalChangeGiven = round(change.reduce((acc, curr) => acc + curr[1], 0));

  if (totalChangeGiven < changeDue) {
    displayChangeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  if (totalChangeGiven === totalCid) {
    let closedOutput = change.map(([unit, val]) => `${unit}: $${val.toFixed(2)}`).join(" ");
    displayChangeDue.innerHTML = `<p>Status: CLOSED ${closedOutput}</p>`;
    return;
  }

  let openOutput = change.map(([unit, val]) => `${unit}: $${val.toFixed(2)}`).join(" ");
  displayChangeDue.innerHTML = `<p>Status: OPEN ${openOutput}</p>`;
};

// Hook to Purchase button
purchaseBtn.addEventListener("click", handleTransaction);

// Example setup (test this with different inputs)
price = 19.5;
cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

priceScreen.innerText = `Price: $${price.toFixed(2)}`;
