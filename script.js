// Retrieve stored codes from local storage, handling potential errors
const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
updateCodeCount();

function storeCode() {
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

  const code = storedCodes.shift(); // Get and remove the first code
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  displayMessage('Your code: ' + code.code);
  updateCodeCount();
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
  const index = storedCodes.findIndex((c) => c.code === code);
  if (index !== -1) {
    storedCodes.splice(index, 1);
    localStorage.setItem('codes', JSON.stringify(storedCodes));
    populateDatabaseTable();
    updateCodeCount();
    displayMessage('Code deleted successfully.');
  } else {
    displayMessage('Code not found.');
  }
}

function deleteAllCodes() {
  storedCodes.length = 0;
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  populateDatabaseTable();
  updateCodeCount();
  displayMessage('All codes deleted successfully.');
}

function deleteSelectedCodes() {
  const selectedCodes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const codesToDelete = [];
  selectedCodes.forEach((checkbox) => {
    codesToDelete.push(checkbox.id.substring(5)); // Extract code from ID
  });
  deleteCodes(codesToDelete);
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
<td\></span>{dateAdded}</td>
      <td>
        <input type="checkbox" id="code-<span class="math-inline">\{code\.code\}" /\>
<button onclick\="deleteCode\('</span>{code.code}')">Delete</button>
      </td>
    `;

  
