// ShoppingList.js (starter)

// 1) 数据与变量 / Data & variables
let shoppingList = [
  "milk", "eggs", "bread"
];

// 2) 数组应用 / Array operations
shoppingList.push("bacon", "ham");
checkCartIsFull(shoppingList);
shoppingList.pop();
checkCartIsFull(shoppingList);

// For checking your progress:
console.log("Updated list:", shoppingList);

// 3) 条件与循环 / Condition & loop
function checkCartIsFull(list) {
  if (list.length > 5) {
    console.log("你的购物车满了");
  }
}

for (let i = 0; i < shoppingList.length; i++) {
  console.log(`${i + 1}. ${shoppingList[i]}`);
}

// 4) 函数与对象 / Functions & objects
function hasItem(list, name) {
    return list.includes(name);
}

let item = { name: "milk", price: 12, quantity: 1 };
