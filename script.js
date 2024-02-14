// Retrieve stored codes from local storage, handling potential errors
const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
updateCodeCount();

function storeCode() {
  const code = document.getElementById('codeInput').value.trim();
  if (code.length !== 6) {
    displayMessage('Please enter a 6-digit code.');
    return;
  }

  if (storedCodes.includes(code)) {
    displayMessage('Code already exists.');
    return;
  }

  storedCodes.push(code);
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

  const code = storedCodes.splice(0, 1)[0]; // Get and remove the first code
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  displayMessage('Your code: ' + code);
  updateCodeCount(); // Update count after deletion
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function updateCodeCount() {
  document.getElementById('codeCount').textContent = storedCodes.length;
}
