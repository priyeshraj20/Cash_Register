let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const coinValue = [ 0.001, 0.005, 0.1, 0.25, 1, 5, 10, 20,
 100];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const balanceCheck = (customerCash) => {
  if(customerCash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  else if(customerCash === price){
    displayChangeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }
}



const changeToGive = (customerCash) => {
 const changePrice = customerCash - price;
 const checkArr = coinValue.filter(num => num < changePrice);
 let remainderList = checkArr.map(check=>customerCash % check);
 console.log(remainderList);
}




purchaseBtn.addEventListener("click", ()=>{
 const customerCash = Number(cash.value);
 balanceCheck(customerCash);
 changeToGive(customerCash);
});