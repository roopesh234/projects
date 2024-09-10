// 1. Reverse the string
function reverseString(str) {
    return str.split('').reverse().join('');
  }
  let originalString = "hello";
  let reversedString = reverseString(originalString);
  console.log(reversedString); // Output: "olleh"

// 2.whether a passed string is a palindrome or not?
function isPalindrome(str) {
    let cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let reversedStr = cleanedStr.split('').reverse().join('');
    if( cleanedStr === reversedStr){
        return "Palindrome"
    }
  }
  let testString = "A man, a plan, a canal, Panama";
  let result = isPalindrome(testString);
  console.log(result); // Output: true
  
// 3. generates all combinations of a string.
function getCombinations(str) {
    let results = [];
    function generateCombinations(prefix, remaining) {
      if (remaining.length === 0) {
        results.push(prefix);
        return;
      }
      generateCombinations(prefix + remaining[0], remaining.slice(1));
      generateCombinations(prefix, remaining.slice(1));
    }
    generateCombinations('', str);
    return results;
  }
  let string = "abc";
  let combinations = getCombinations(string);
  console.log(combinations); 

// 4. string that has letters in alphabetical order.
function sortStringAlphabetically(str) {
    return str.split('').sort().join('');
    }
    let alphabetic = "javascript";
    let sortedString = sortStringAlphabetically(alphabetic);
    console.log(sortedString); // Output: "aacijprstv"

// 5. a string as a parameter and converts the first letter of each word into upper case.
function capitalizeFirstLetters(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
let sentense = "hey, hello, how are you?";
let  capitalized = capitalizeFirstLetters(sentense);
console.log(capitalized); // Output: "Hey, Hello , How Are You?"

// 6. a string as a parameter and finds the longest word within the string.
function longestInSentence (str) {
    let words = str.split(' ');
    let long = " ";
    for (let word of words) {
        if (word.length > long.length) {
            long = word;
        }
    }
    return long;
}
let sen = "i love you javascript"
let longest = longestInSentence(sen)
console.log(longest) //javascript

// 7. a string as a parameter and counts the number of vowels within the string.
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}
let sentence = "I love JavaScript!";
let vowelCount = countVowels(sentence);
console.log(vowelCount); // Output: 6




  
  