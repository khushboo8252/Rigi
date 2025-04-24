document.getElementById("sendButton").addEventListener("click", handleChat);
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        handleChat();
    }
});

document.getElementById("closeChat").addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "none";
});

document.getElementById("openChat").addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "block";
});


function handleChat() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    const chatlog = document.getElementById("chatlog");

    if (!message) return;

    // Append user message
    const userMsg = document.createElement("div");
    userMsg.innerHTML = `<strong>You:</strong> ${escapeHTML(message)}`;
    chatlog.appendChild(userMsg);

    // Clear input
    userInput.value = "";

    // Response logic
    const responses = {
        "hi": "Hello! How can I assist you today?",
        "hello": "Hi there! Need help with something?",
        "how are you?": "I'm doing great! How can I help you?",
        "what services do you offer?": "We offer trend analysis, product suggestions, and more.",
        "bye": "Goodbye! See you soon."
    };

    const normalizedMsg = message.toLowerCase();
    const reply = responses[normalizedMsg] || "I'm not sure how to respond to that.";

    // Append bot response
    const botMsg = document.createElement("div");
    botMsg.innerHTML = `<strong>Bot:</strong> ${escapeHTML(reply)}`;
    chatlog.appendChild(botMsg);

    // Auto-scroll
    chatlog.scrollTop = chatlog.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}
