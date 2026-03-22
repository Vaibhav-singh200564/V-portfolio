const fs = require('fs');
const svgText = fs.readFileSync('test_stats.svg', 'utf8');
let patched = svgText.replace(/(data-testid="stars"[^>]*>)[^<]*(<\/text>)/g, '$14$2');
patched = patched.replace(/(data-testid="level-rank-icon"[^>]*>)[^<]*(<\/text>)/g, '$1C++$2');

console.log("Has 4 stars:", patched.includes('>4</text>'));
console.log("Has C++:", patched.includes('C++'));
