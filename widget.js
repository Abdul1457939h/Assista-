document.addEventListener('DOMContentLoaded', function () {
  const bubble = document.getElementById('asista-bubble');
  const widget = document.getElementById('asista-widget');
  const input = document.getElementById('asista-input');
  const sendBtn = document.getElementById('asista-send');
  const chatBox = document.getElementById('asista-chat-box');

  // Toggle widget on bubble click
  bubble.addEventListener('click', function () {
    widget.classList.toggle('hidden');
  });

  // Send message on Enter key
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

  sendBtn.addEventListener('click', async function () {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Display user message
    const userMsgElem = document.createElement('div');
    userMsgElem.className = 'asista-msg user';
    userMsgElem.textContent = userMessage;
    chatBox.appendChild(userMsgElem);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid JSON returned from server");
      }

      const botReply = data.reply || "🤖 AI did not return a response.";
      const botMsgElem = document.createElement('div');
      botMsgElem.className = 'asista-msg bot';
      botMsgElem.textContent = botReply;
      chatBox.appendChild(botMsgElem);
      chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
      console.error("Widget Error:", err);
      const errorElem = document.createElement('div');
      errorElem.className = 'asista-msg bot';
      errorElem.textContent = "⚠️ Failed to reach AI server.";
      chatBox.appendChild(errorElem);
    }
  });
});
