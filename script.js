// Retrieve stored codes from local storage, handling potential errors
let storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
updateCodeCount();

function storeCode() {
  confunction storeCode() {
  const code = document.getElementById('codeInput').value.trim();

  // Validate code input:
  if (code.length !== 6 || isNaN(code)) {
    displayMessage('Please enter a valid 6-digit code.');
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

  const code = storedCodes[0].code;
  displayCodeButton(code);
}


function showDatabase() {
  const database = document.getElementById('database');
  const showDatabaseButton = document.getElementById('showDatabase');

  // Simulate authentication (replace with your actual authentication logic)
  const isAuthenticated = true; // Temporary authentication

  if (isAuthenticated) {
    database.style.display = database.style.display === 'none' ? 'block' : 'none';
    showDatabaseButton.textContent = database.style.display === 'block' ? 'Close Codes' : 'Manage Codes';
    populateDatabaseTable();
  } else {
    displayMessage('You are not authorized to view codes.');
  }
}

function deleteCode(code) {
  storedCodes = storedCodes.filter((c) => c.code !== code);
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  populateDatabaseTable();
  updateCodeCount();
  displayMessage('Code deleted successfully.');
}

function deleteAllCodes() {
  storedCodes = [];
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  populateDatabaseTable();
  updateCodeCount();
  displayMessage('All codes deleted successfully.');
}

function displayMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000); // Hide message after 3 seconds
}

function updateCodeCount() {
  const codeCountElement = document.getElementById('codeCount');
  codeCountElement.textContent = storedCodes.length;
}

function populateDatabaseTable() {
  const tableBody = document.getElementById('codesTable');
  tableBody.innerHTML = '';

  storedCodes.forEach((codeObj) => {
    const dateAdded = formatDate(codeObj.dateAdded);
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${codeObj.code}</td>
      <td>${dateAdded}</td>
      <td>
        <button onclick="deleteCode('${codeObj.code}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(tableRow);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format date according to user's locale
}

function displayCodeButton(code) {
  const codeOutputContainer = document.getElementById('codeOutputContainer');
  codeOutputContainer.innerHTML = `
    <p>Your code: <span id="code">${code}</span></p>
    <button id="copyButton">Copy Code</button>
  `;
  const copyButton = document.getElementById('copyButton');
  copyButton.addEventListener('click', () => {
    copyToClipboard(code);
  });
}


function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  displayMessage('Code copied to clipboard.');
}
