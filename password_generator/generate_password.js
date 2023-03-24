// 字串版
function generatePassword(req) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = '1234567890';
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';
  
  let picked = '';
  let password = '';
  const excluded = req.excludeCharacters;
  const length = Number(req.length);
  
  // add what the user picked
  if (req.lowercase) picked += lowerCaseLetters;
  if (req.uppercase) picked += upperCaseLetters;
  if (req.numbers) picked += numbers;
  if (req.symbols) picked += symbols;

  // remove the excluded from picked
  for (let char of excluded) {
    if (picked.includes(char)) {
      picked = picked.replace(char, '');
    }
  }

  // 什麼都沒填/有長度沒選項/扣光的情況
  if (picked.length == 0) return;

  // generate
  for (let i = 0; i < length; i++) {
    password += picked.charAt(Math.floor(Math.random() * picked.length));
  }

  return password;
}

/*
// 陣列版
function generatePasswordAry(req) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = '1234567890';
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';
  
  let picked = [];
  let password = '';
  const excluded = req.excludeCharacters;
  const length = Number(req.length);
  const lowerCaseAry = lowerCaseLetters.split('');
  const upperCaseAry = upperCaseLetters.split('');
  const numAry = numbers.split('');
  const symbolAry = symbols.split('');
  
  // add what the user picked
  if (req.lowercase) picked = [...picked, ...lowerCaseAry];
  if (req.uppercase) picked = [...picked, ...upperCaseAry];
  if (req.numbers) picked = [...picked, ...numAry];
  if (req.symbols) picked = [...picked, ...symbolAry];


  // remove the excluded from picked
  for (let char of excluded) {
    let idx= picked.indexOf(char);
    if (idx > -1) {
      picked.splice(idx, 1);
    }
  }

  // 扣光的情況
  if (picked.length == 0) return;

  // generate
  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * picked.length);
    password += picked[randomIdx];
  } 
}
*/

module.exports = generatePassword;