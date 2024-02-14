// Retrieve stored codes from local storage, handling potential errors
const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
updateCodeCount();

function storeCode() {
  const code = document.getElementById('codeInput').value.trim();
  if (code.length !== 6) {
    displayMessage('Please enter a 6-digit code.');
    return;
  }

  if (storedCodes.some((c) => c.code === code)) {
    displayMessage('Code already exists.');
    return;
  }

  const dateAdded = new Date().toISOString(); // Store current date/time
  storedCodes.push({ code: code, dateAdded: dateAdded });
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  displayMessage('Code stored successfully.');
  document.getElementById('codeInput').value = '';
  updateCodeCount();
}

function getCode() {
  if (storedCodes.length === 0) {
    displayMessage('No codes available.');
    return;
  }

  const code = storedCodes.shift(); // Get and remove the first code
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  displayMessage('Your code: ' + code.code
                 
