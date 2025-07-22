// Search functionality for finding users by public key
import { currentUserPublicKey } from './chat.js';
import { publicKey } from './connectWallet.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-msgs');
    const contactListContainer = document.querySelector('.offsetmod.dsh-items-upper');
    const chatInterface = document.getElementById('chat-interface');
    const contactListView = document.getElementById('contact-list-view');
    
    let searchTimeout;
    
    async function searchUsers(query) {
        try {
            const response = await fetch('/api/search-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });
            
            if (!response.ok) {
                throw new Error('Search failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    }
    
    async function updateChatBuddy(targetPublicKey) {
        try {
            // Get current user public key from wallet connection
            const currentUser = publicKey || currentUserPublicKey;
            
            if (!currentUser) {
                console.error('No current user public key available');
                return null;
            }
            
            const response = await fetch('/api/update-chat-buddy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    currentUser: currentUser,
                    targetUser: targetPublicKey 
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update chat buddy');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Update chat buddy error:', error);
            return null;
        }
    }
    
    function createContactItem(userData) {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'names-disp contact-item';
        contactDiv.setAttribute('data-username', userData.public_key);
        contactDiv.setAttribute('data-lastseen', userData.last_seen || 'Never');
        
        // Format public key for display (first 6 + ... + last 6 characters)
        const displayKey = userData.public_key.length > 12 
            ? `${userData.public_key.substring(0, 6)}...${userData.public_key.substring(userData.public_key.length - 6)}`
            : userData.public_key;
        
        contactDiv.innerHTML = `
            <ul class="namesdisp-ul">
                <img class="userimg-disp"></img>
                <div class="screen-li">
                    <li class="disp-items">
                        ${displayKey}
                    </li>
                    <li class="disp-items">
                        ${userData.status || 'Available for chat'}
                    </li>
                </div>
            </ul>
            <p class="msg-timer-text">${userData.last_seen || 'Never'}</p>
        `;
        
        // Add click handler
        contactDiv.addEventListener('click', async function() {
            console.log('Contact clicked:', userData.public_key);
            
            // Update chat buddy in database
            await updateChatBuddy(userData.public_key);
            
            // Update chat interface
            const chatUsername = document.getElementById('chat-username');
            const chatLastSeen = document.getElementById('chat-last-seen');
            
            if (chatUsername) chatUsername.textContent = displayKey;
            if (chatLastSeen) chatLastSeen.textContent = userData.last_seen || 'Never';
            
            // Show chat interface
            contactListView.style.display = 'none';
            chatInterface.style.display = 'flex';
        });
        
        return contactDiv;
    }
    
    function clearSearchResults() {
        // Remove all dynamically created contact items
        const dynamicContacts = contactListContainer.querySelectorAll('.contact-item.search-result');
        dynamicContacts.forEach(contact => contact.remove());
    }
    
    function displaySearchResults(users) {
        clearSearchResults();
        
        if (users.length === 0) {
            // Show no results message
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'search-result no-results';
            noResultsDiv.innerHTML = `
                <div class="names-disp">
                    <p style="text-align: center; color: #666; padding: 20px;">
                        No users found
                    </p>
                </div>
            `;
            contactListContainer.appendChild(noResultsDiv);
            return;
        }
        
        // Add search results
        users.forEach(user => {
            const contactItem = createContactItem(user);
            contactItem.classList.add('search-result');
            contactListContainer.appendChild(contactItem);
        });
    }
    
    function performSearch(query) {
        if (!query || query.length < 3) {
            clearSearchResults();
            return;
        }
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Debounce search
        searchTimeout = setTimeout(async () => {
            console.log('Searching for:', query);
            
            const results = await searchUsers(query);
            displaySearchResults(results);
        }, 300);
    }
    
    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            performSearch(query);
        });
        
        // Clear search when input is cleared
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape' || !e.target.value) {
                clearSearchResults();
            }
        });
    }
    
    // Set current user public key (this should be called when wallet connects)
    window.setCurrentUserPublicKey = function(publicKey) {
        currentUserPublicKey = publicKey;
        console.log('Current user public key set:', publicKey);
    };
});