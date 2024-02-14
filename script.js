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
  // ... (previously provided showDatabase function) ...
}

function deleteCode(code) {
  // ... (previously provided deleteCode function) ...
}

function deleteAllCodes() {
  // ... (previously provided deleteAllCodes function) ...
}

function displayMessage(message) {
  // ... (previously provided displayMessage function) ...
}

function updateCodeCount() {
  // ... (previously provided updateCodeCount function) ...
}

// Function to format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format date according to user's locale
}

// Function to add checkboxes and delete functionality to database table
function populateDatabaseTable() {
  const tableBody = document.getElementById('codesTable');
  tableBody.innerHTML = '';

  storedCodes.forEach((code) => {
    const dateAdded = formatDate(code.dateAdded); // Format date
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td><span class="math-inline">\{code\.code\}</td\>
<td\></span>{dateAdded}
