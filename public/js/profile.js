import { isConnected, data } from './connectWallet.js';

const profilePopup = document.createElement('div');
profilePopup.className = 'profile-popup';
document.body.appendChild(profilePopup);

function showProfileSettings() {
  console.log("Showing profile settings, connected:", isConnected);
  if (!isConnected) {
    alert("Please connect your wallet to view profile settings");
    return;
  }

  profilePopup.innerHTML = `
    <div class="profile-content">
      <div class="profile-header">
        <h3>Profile Settings</h3>
        <span class="close-profile">&times;</span>
      </div>
      <div class="profile-details">
        <div class="profile-image-container">
          <img src="img/person-img.png" alt="Profile" class="profile-image">
        </div>
        <div class="profile-info">
          <p><strong>Username:</strong> <span class="username">${data.username || 'Not Set'}</span></p>
          <p class="address"><strong>Public Key:</strong> <span class="public-key">${data.publicKey || 'Not Connected'}</span></p>
        </div>
      </div>
    </div>
  `;

  profilePopup.style.display = 'flex';

  const closeButton = profilePopup.querySelector('.close-profile');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      profilePopup.style.display = 'none';
    });
  }

  profilePopup.addEventListener('click', (event) => {
    if (event.target === profilePopup) {
      profilePopup.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const accountDropdown = document.querySelector('.account-drop-down-window');
  if (accountDropdown) {
    accountDropdown.addEventListener('click', () => {
      showProfileSettings();
    });
  }
});