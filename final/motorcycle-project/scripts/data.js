// Get query parameters
const params = new URLSearchParams(window.location.search);

// Select results div
const results = document.getElementById('results');

// Build results dynamically
results.innerHTML = `
  <p><strong>Full Name:</strong> ${params.get('fullname') || 'N/A'}</p>
  <p><strong>Email:</strong> ${params.get('email') || 'N/A'}</p>
  <p><strong>Message:</strong> ${params.get('message') || 'N/A'}</p>
  <p><strong>Subscribed to Mailing List:</strong> ${params.get('subscribe') === 'yes' ? 'Yes' : 'No'}</p>
`;
