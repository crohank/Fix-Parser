const form = document.getElementById('fixForm');
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const fixMessage = document.getElementById('fixMessage').value;

  // Send the FIX message to the server via AJAX
  const response = await fetch('/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      fixMessage: fixMessage,
    }),
  });

  const parsedData = await response.json();

  // Build the table rows from the parsed data
  const tableBody = document.querySelector('#parsedTable tbody');
  tableBody.innerHTML = ''; // Clear any existing rows
  parsedData.forEach(row => {
    const tr = document.createElement('tr');

    // Append each field (fieldNo, fieldName, value, lookup if available)
    tr.innerHTML = `
      <td>${row.fieldNo}</td>
      <td>${row.fieldName}</td>
      <td>${row.value}</td>
      <td>${row.lookup || ''}</td>
    `;

    tableBody.appendChild(tr);
  });
});
