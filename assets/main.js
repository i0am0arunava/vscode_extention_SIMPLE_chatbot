document.addEventListener("DOMContentLoaded", function() {
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");

  const responses = {
      "hi": "Hello! How can I help you today?",
      "how are you": "I'm just a bot, but I'm doing great! How about you?",
      "what is your name": "I'm Chatbot, your virtual assistant.",
      "bye": "Goodbye! Have a great day!",
      "what is javascript": "JavaScript is a versatile programming language commonly used in web development to create interactive effects within web browsers.",
      "what is html": "HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages.",
      "what is css": "CSS stands for Cascading Style Sheets. It is used to style and layout web pages, including the design, colors, and fonts.",
      "what is python": "Python is a high-level, interpreted programming language known for its readability and simplicity. It's widely used in web development, data science, artificial intelligence, and more.",
      "what is java": "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It's widely used for building enterprise-scale applications.",
      "what is c++": "C++ is a powerful, high-performance programming language that supports both procedural and object-oriented programming paradigms. It's commonly used in system/software development and game programming.",
      "what is git": "Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
      "what is github": "GitHub is a web-based platform used for version control and collaborative software development using Git.",
      "what is api": "An API (Application Programming Interface) is a set of rules that allows different software entities to communicate with each other.",
      "what is sql": "SQL (Structured Query Language) is a standard programming language for managing and manipulating relational databases.",
      "how to learn coding": "Start with a beginner-friendly language like Python or JavaScript, and use online resources like Codecademy, freeCodeCamp, or Coursera to follow structured courses.",
      "best programming language": "The best programming language depends on your goals. Python is great for beginners and data science, JavaScript for web development, and C++ for system programming.",
      "what is machine learning": "Machine learning is a subset of artificial intelligence that involves training algorithms to make predictions or decisions based on data.",
      "what is ai": "AI, or artificial intelligence, refers to the simulation of human intelligence in machines that are programmed to think and learn like humans.",
      "what is react": "React is a JavaScript library for building user interfaces, maintained by Facebook. It allows developers to create large web applications that can update and render efficiently in response to data changes.",
      "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs!"
  };

  const patterns = [
      { pattern: /who (created|made) you/i, response: "I was created by a team of developers at OpenAI." },
      { pattern: /who (created|made) (java|python|c\+\+)/i, response: "Java was created by James Gosling, Python by Guido van Rossum, and C++ by Bjarne Stroustrup." },
      { pattern: /what (is|are) (you|chatbot)/i, response: "I'm a chatbot created to help you with information about programming and technology." },
      { pattern: /how (do|does) (git|github) work/i, response: "Git is a version control system that tracks changes in your code, while GitHub is a platform that hosts your Git repositories and enables collaboration." },
      { pattern: /recommend a (book|resource) on (programming|coding)/i, response: "For beginners, I recommend 'Automate the Boring Stuff with Python' by Al Sweigart and 'Eloquent JavaScript' by Marijn Haverbeke." }
  ];

  sendButton.addEventListener("click", function() {
      const userMessage = userInput.value.trim();
      if (userMessage) {
          addMessageToChatLog(`User:   ${userMessage}`, 'user-message');
          userInput.value = '';
          generateResponse(userMessage.toLowerCase());
      }
  });

  function addMessageToChatLog(message, className) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-container');

      const messageElement = document.createElement('p');
      messageElement.classList.add('message');

      const [aiPart, responsePart] = message.split(':');
      const aiSpan = document.createElement('span');
      aiSpan.textContent = aiPart;
      aiSpan.style.fontWeight = 'bold';
      aiSpan.style.color = '#2ecc71'; // Green color
      messageElement.appendChild(aiSpan);

      const colonSpan = document.createElement('span');
      colonSpan.textContent = ':';
      colonSpan.style.fontWeight = 'bold';
      colonSpan.style.color = '#2ecc71'; // Green color
      messageElement.appendChild(colonSpan);

      messageElement.insertAdjacentText('beforeend', responsePart.trim());

      messageContainer.appendChild(messageElement);
      chatLog.appendChild(messageContainer);
      chatLog.scrollTop = chatLog.scrollHeight;
  }

  function generateResponse(userMessage) {
      let botResponse = getResponse(userMessage);
      setTimeout(() => {
          addMessageToChatLog(`AI:     ${botResponse}`, 'ai-message');
      }, 500);
  }

  function getResponse(userMessage) {
      for (let patternObj of patterns) {
          if (patternObj.pattern.test(userMessage)) {
              return patternObj.response;
          }
      }
      return responses[userMessage] || "Sorry, I didn't understand that. Here are some questions you can ask me 'What is JavaScript?', 'How to learn coding?', 'Tell me a joke', 'What is AI?'";
  }
});
