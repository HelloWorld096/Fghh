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
  displayMessage('Your code: ' + code.code);
  updateCodeCount();
}

function showDatabase() {
  const database = document.getElementById('database');
  database.style.display = 'block';

  const codes = JSON.parse(localStorage.getItem('codes')) || [];
  const tableBody = document.getElementById('codesTable');
  tableBody.innerHTML = '';

  codes.forEach((code) => {
    const dateAdded = new Date(code.dateAdded).toLocaleString(); // Format date
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${code.code}</td>
      <td>${dateAdded}</td>
      <td><button onclick="deleteCode('${code.code}')">Delete</button></td>
    `;
    tableBody.appendChild(tableRow);
  });
}

function deleteCode(code) {
  const codes = JSON.parse(localStorage.getItem('codes'));
  const index = codes.findIndex((c) => c.code === code);
  if (index !== -1) {
    codes.splice(index, 1);
    localStorage.setItem('codes', JSON.stringify(codes));
    showDatabase(); // Refresh the database view
    updateCodeCount();
    displayMessage('Code deleted successfully.');
  } else {
    displayMessage('Code not found.');
  }
}

function deleteAllCodes() {
  localStorage.removeItem('codes');
  showDatabase(); // Clear the table
  updateCodeCount();
  displayMessage('All codes deleted.');
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function updateCodeCount() {
  document.getElementById('codeCount').textContent = storedCodes.length;
}
