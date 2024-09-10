const addfn = require("./add");

console.log("hello world");

const sum = addfn(2, 3);
//we can call many times as its reusable function..
const sum1 = addfn(23, 24);

console.log(sum);
console.log(sum1);
