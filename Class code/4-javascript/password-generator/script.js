// ==============================
// Password Generator (teacher v)
// Minimally fixed + comments
// ==============================

// Lowercase: ASCII 'a' = 97 → 'a'..'z'
function getRandomLower() {
  // ASCII中的 a 的編碼是 97
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Uppercase: ASCII 'A' = 65 → 'A'..'Z'
function getRandomUpper() {
  // ASCII中的 A 的編碼是 65
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Numbers: ASCII '0'..'9' = 48..57
function getRandomNumber() {
  // FIX: use *10 (not *20) so we stay within '0'..'9'
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Symbols: pick one random character from a string
function getRandomSymbol() {
  // FIX: cleaned string & removed unnecessary backslashes in '[]'
  // 💡 Suggestion: include only the symbols you want to allow
  const symbols = "!@#$%^&*()_+<>/,.=-[]{}|";
  // 隨機取 0..length-1 的索引
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Map short keys → generator functions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Build a password by cycling through the selected types
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  // true/false 會在加總時變成 1/0
  const typesCount = lower + upper + number + symbol;

  // 建立 [{lower}, {upper}, {number}, {symbol}]，只保留為 true 的項目
  const typesArr = [{ lower }, { upper }, { number }, { symbol }]
    .filter(item => Object.values(item)[0]);

  if (typesCount === 0) return '';

  // 每一輪依序加入各類型一個字元（平均分佈）
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]; // "lower" | "upper" | "number" | "symbol"
      // FIX: append to the string variable, not the function name
      generatedPassword += randomFunc[funcName]();
    });
  }

  // FIX: slice the built string
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// ============ DOM references ============
const resultEl    = document.getElementById('result');
const lengthEl    = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl   = document.getElementById('numbers');   // FIX: there must be an element with id="numbers"
const symbolsEl   = document.getElementById('symbols');
const generateEl  = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Generate button
generateEl.addEventListener('click', () => {
  // FIX: use { ... } block (not ()=> ( ... )) because we have statements
  const length    = Number(lengthEl.value);
  const hasLower  = lowercaseEl.checked;
  const hasUpper  = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;     // FIX: use numbersEl
  const hasSymbol = symbolsEl.checked;

  // FIX: call the function named generatePassword (not generatedPassword)
  const pwd = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  // 💡 Suggestion: textContent is safer than innerText for plain text
  resultEl.textContent = pwd;
});

// Copy button
clipboardEl.addEventListener('click', () => {
  const password = resultEl.textContent || '';
  if (!password) return;

  // 💡 Suggestion: navigator.clipboard works on HTTPS; add fallback if needed
  navigator.clipboard.writeText(password)
    .then(() => alert('Password copied to clipboard'))
    .catch(() => {
      // Fallback for some environments
      const tmp = document.createElement('input');
      tmp.value = password;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      tmp.remove();
      alert('Password copied to clipboard');
    });
});

/* =============================
   Junior dev takeaways:
   1) Arrow functions:
      - 多行語句用 () => { ... }，不是 () => ( ... )
   2) ID / class 名稱要一致：
      - HTML 的 id="numbers" → JS 用 document.getElementById('numbers')
   3) 字元亂數：
      - 小寫: 97 + 0..25；大寫: 65 + 0..25；數字: 48 + 0..9
   4) 字串索引：
      - s[Math.floor(Math.random()*s.length)] 取得隨機字元
   5) 命名不要衝突：
      - 函數 generatePassword 與變數 generatedPassword 不能搞混
   6) 安全提示：
      - Math.random 不是密碼學安全，真實專案請用 Web Crypto API
   ============================= */
