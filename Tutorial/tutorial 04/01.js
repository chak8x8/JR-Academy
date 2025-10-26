/* Exercise 1: Find Max Value 
Write a function that finds the maximum value in an array of numbers 
Input: [1,5,3,6,2,9,4] Output: 9 
function findMaxValue([]) {
    return 
}
*/
const findMaxValue = (arr) =>
    Array.isArray(arr) && arr.length
    ? arr.reduce((max, n) => (n > max ? n : max), -Infinity)
    : null;

/* Exercise 2: Reverse String Write a function that reverses a given string.
Input: “kevin”
Output: “nivek”
function reverseString(str) {xxx}
*/
const reverseString = (str) => {
    if (typeof str !== 'string') return '';
    return str.split('').reverse().join('');
};