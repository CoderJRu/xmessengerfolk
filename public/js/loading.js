
// Loading overlay functionality
export function showLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

export function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// Create and inject loading overlay into DOM
const loadingHTML = `
  <div id="loading-overlay" style="
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(14, 16, 19, 0.9);
    z-index: 9999;
    justify-content: center;
    align-items: center;
  ">
    <div style="
      width: 60px;
      height: 60px;
      border: 3px solid #333;
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s linear infinite;
    "></div>
  </div>
  <style>
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
`;

document.body.insertAdjacentHTML('beforeend', loadingHTML);
