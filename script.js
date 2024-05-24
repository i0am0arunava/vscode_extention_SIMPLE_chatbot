// Import the Groq SDK
import Groq from 'groq-sdk';

// Instantiate the Groq client with the API key
const groq = new Groq({ apiKey: 'your api key', dangerouslyAllowBrowser: true });

document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
      // Display user message
      displayMessage('User', userMessage, 'user-message');
      userInput.value = '';

      // Get AI response
      await getAIResponse(userMessage);
    }
  });

  async function getAIResponse(message) {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": message
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });

    // Create a new paragraph element for the AI response
    const aiMessageElement = document.createElement('div');
    aiMessageElement.classList.add('message', 'ai-message');
    aiMessageElement.innerHTML = '<strong>AI:</strong> ';
    chatBox.appendChild(aiMessageElement);

    // Use a variable to accumulate the response content
    let response = '';

    for await (const chunk of chatCompletion) {
      const deltaContent = chunk.choices[0]?.delta?.content || '';
      response += deltaContent;
      
      // Use regex to replace code blocks with styled divs
      aiMessageElement.innerHTML = formatMessage(response);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    console.log(response);
    return response;
  }

  function formatMessage(message) {
    // Replace code blocks with styled divs
    return message.replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>').replace(/\n/g, '<br>');
  }

  function displayMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
// bundile.js is given  inside th asset folder 
