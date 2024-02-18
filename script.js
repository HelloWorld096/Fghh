let storedCodes = JSON.parse(localStorage.getItem('codes')) || [];

function storeCode() {
  const code = document.getElementById('codeInput').value.trim();

  if (code.length !== 6 || isNaN(code)) {
    displayPopupMessage('Please enter a valid 6-digit code.', 'red');
    return;
  }

  if (storedCodes.some((c) => c.code === code)) {
    displayPopupMessage('Code already exists.', 'red');
    return;
  }

  const dateAdded = new Date().toISOString();
  storedCodes.push({ code: code, dateAdded: dateAdded });
  localStorage.setItem('codes', JSON.stringify(storedCodes));
  displayPopupMessage('Code stored successfully.', 'green');
  document.getElementById('codeInput').value = '';
  updateCodeCount();
}

function getCode() {
  if (storedCodes.length === 0) {
    displayPopupMessage('No codes available.', 'red');
    return;
  }

  const randomIndex = Math.floor(Math.random() * storedCodes.length);
  const code = storedCodes[randomIndex];
  storedCodes.splice(randomIndex, 1);

  updateCodeCount();

  const separateCodeDisplay = document.getElementById('separateCodeDisplay');
  separateCodeDisplay.innerHTML = `<p class="large-code anton-regular" style="text-align: center; margin: 0; padding: 0;" onclick="copyCode('${code.code}')">${code.code}</p>`;

  localStorage.setItem('codes', JSON.stringify(storedCodes));
}

function copyCode(code) {
  const tempInput = document.createElement('input');
  tempInput.value = code;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);

  displayPopupMessage('Code copied to clipboard.', 'green');
}

function displayPopupMessage(message, color = 'white') {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  popup.style.color = color;
  document.body.appendChild(popup);
  
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 3000);
}

function updateCodeCount() {
  const codeCountElement = document.getElementById('codeCount');
  codeCountElement.textContent = storedCodes.length;
}

function deleteAllCodes() {
  localStorage.removeItem('codes');
  storedCodes = [];
  populateModalTable();
  updateCodeCount();
  displayPopupMessage('All codes deleted successfully.', 'green');
}

function populateModalTable() {
  const modalTableBody = document.getElementById('modalCodesTable');
  modalTableBody.innerHTML = '';

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
    modalTableBody.appendChild(tableRow);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}


function displayStoredCodes() {
  const modalTableBody = document.getElementById('modalCodesTable');
  modalTableBody.innerHTML = '';

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
    modalTableBody.appendChild(tableRow);
  });
}

document.getElementById('showPopupButton').addEventListener('click', function() {
  displayStoredCodes();
  showPopup();
});
document.addEventListener('DOMContentLoaded', function() {
  updateCodeCount();
});
