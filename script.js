const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Replace 'YOUR_API_KEY' with your actual GPT-3 API key
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

sendButton.addEventListener('click', () => {
  const userMessage = userInput.value;
  displayMessage(userMessage, 'user');

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 50 // Adjust as needed
    })
  })
  .then(response => response.json())
  .then(data => {
    const botMessage = data.choices[0].text.trim();
    displayMessage(botMessage, 'bot');
  })
  .catch(error => console.error('Error:', error));
  
  userInput.value = '';
});

function displayMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
