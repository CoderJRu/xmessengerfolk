// Chat interface functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactListView = document.getElementById('contact-list-view');
    const chatInterface = document.getElementById('chat-interface');
    const contactItems = document.querySelectorAll('.contact-item');
    const chatBackBtn = document.getElementById('chat-back-btn');
    const contactsBackBtn = document.getElementById('contacts-back-btn');
    const chatUsername = document.getElementById('chat-username');
    const chatLastSeen = document.getElementById('chat-last-seen');

    // Contact item click functionality - toggle to chat interface
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            const lastSeen = this.getAttribute('data-lastseen');
            
            // Update chat interface with selected contact info
            if (chatUsername) chatUsername.textContent = username;
            if (chatLastSeen) chatLastSeen.textContent = lastSeen;
            
            // Toggle views - show chat interface, hide contact list
            contactListView.style.display = 'none';
            chatInterface.style.display = 'flex';
        });
    });

    // Chat back button - simple and reliable
    if (chatBackBtn) {
        function goBackToContacts() {
            console.log('Going back to contact list');
            contactListView.style.display = 'block';
            chatInterface.style.display = 'none';
        }
        
        // Universal event handler for all devices
        chatBackBtn.addEventListener('pointerup', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back button activated');
            goBackToContacts();
        });
        
        // Fallback for older devices
        chatBackBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back button clicked (fallback)');
            goBackToContacts();
        });
    }

    // Contacts back button - return to main navigation
    if (contactsBackBtn) {
        contactsBackBtn.addEventListener('click', function() {
            // Use existing navigation system
            if (typeof currentWindowIndex !== 'undefined') {
                currentWindowIndex = 1; // Go back to dashboard
                if (typeof refresh === 'function') {
                    refresh();
                }
            }
        });
    }

    // 3-dot menu dropdown functionality
    const chatMenuToggle = document.getElementById('chat-menu-toggle');
    const chatDropdown = document.getElementById('chat-dropdown');
    const mobileBackOption = document.getElementById('mobile-back-option');

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

    // Mobile back option functionality
    if (mobileBackOption) {
        mobileBackOption.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile back option clicked');
            
            // Close dropdown
            if (chatDropdown) {
                chatDropdown.classList.remove('show');
            }
            
            // Go back to contact list
            contactListView.style.display = 'block';
            chatInterface.style.display = 'none';
        });
    }

    // Message input functionality
    const messageInput = document.getElementById('chat-message-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const messagesContainer = document.getElementById('chat-messages');

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

        // Send button click
        sendBtn.addEventListener('click', sendMessage);
        
        // Enter key press
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});