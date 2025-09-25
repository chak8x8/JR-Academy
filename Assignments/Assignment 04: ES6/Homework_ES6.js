// Task 1
const name = "Alice";
if (true) {
  const name = "Bob"; // const here because it's not reassigned
  console.log(name);  // Bob
}
console.log(name);    // Alice

// Task 2
const add = (a, b) => a + b;
// Arrow 'this' note: arrow functions capture 'this' from the surrounding scope;
// regular functions' 'this' depends on how they're called.

// Task 3
let greeting = `Hello, ${name}!
Welcome to the course.`;
// or: `Hello, ${name}!\nWelcome to the course.`

// Task 4
const person = {
  name: "Alice",
  age: 25,
  city: "Sdyney",
};

const { name: personName, age } = person;
function randomFunction({ name, age }) {
  return `My name is ${name} and I am ${age} years old.`;
}

// Task 5
function calculateArea(width, height = width) {
  return width * height;
}

// Task 6
function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + Number(n || 0), 0);
}
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1,2,3,4]
