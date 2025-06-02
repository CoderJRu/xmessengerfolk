// Chat interface functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu functionality
    const chatMenuToggle = document.getElementById('chat-menu-toggle');
    const chatDropdown = document.getElementById('chat-dropdown');

    if (chatMenuToggle && chatDropdown) {
        chatMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            chatDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!chatMenuToggle.contains(e.target) && !chatDropdown.contains(e.target)) {
                chatDropdown.classList.remove('show');
            }
        });
    }

    // Message input functionality
    const messageInput = document.querySelector('.chat-message-input');
    const sendBtn = document.querySelector('.chat-send-btn');
    const messagesContainer = document.querySelector('.chat-messages');

    if (messageInput && sendBtn && messagesContainer) {
        function sendMessage() {
            const messageText = messageInput.value.trim();
            if (messageText) {
                // Create new message element
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = messageText;
                
                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                const now = new Date();
                messageTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                messageDiv.appendChild(messageContent);
                messageDiv.appendChild(messageTime);
                messagesContainer.appendChild(messageDiv);
                
                // Clear input and scroll to bottom
                messageInput.value = '';
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Back button functionality
    const chatBackBtn = document.getElementById('chat-back-btn');
    if (chatBackBtn) {
        chatBackBtn.addEventListener('click', function() {
            // Use existing navigation system
            if (typeof currentWindowIndex !== 'undefined') {
                currentWindowIndex = 1; // Go back to dashboard
                if (typeof refresh === 'function') {
                    refresh();
                }
            }
        });
    }
});