// Deployment Readiness Checker Frontend Interface

export async function checkDeploymentStatus() {
  try {
    showDeploymentLoading();
    
    const response = await fetch('/deployment-status');
    const data = await response.json();
    
    displayDeploymentResults(data);
  } catch (error) {
    console.error('Deployment check failed:', error);
    showDeploymentError(error.message);
  }
}

export async function checkHealthStatus() {
  try {
    const response = await fetch('/health');
    const data = await response.json();
    
    updateHealthIndicator(data);
  } catch (error) {
    console.error('Health check failed:', error);
    updateHealthIndicator({ status: 'unhealthy', error: error.message });
  }
}

function showDeploymentLoading() {
  const container = document.getElementById('deployment-status-container');
  if (container) {
    container.innerHTML = `
      <div class="deployment-loading">
        <div class="loading-spinner"></div>
        <p>Running deployment readiness checks...</p>
      </div>
    `;
  }
}

function displayDeploymentResults(data) {
  const container = document.getElementById('deployment-status-container');
  if (!container) return;

  const statusColor = data.ready ? '#4CAF50' : data.score >= 75 ? '#FF9800' : '#F44336';
  const statusIcon = data.ready ? '✅' : data.score >= 75 ? '⚠️' : '❌';
  const statusText = data.ready ? 'READY' : data.score >= 75 ? 'NEEDS ATTENTION' : 'NOT READY';

  container.innerHTML = `
    <div class="deployment-results">
      <div class="deployment-header" style="border-left: 4px solid ${statusColor};">
        <h3>${statusIcon} Deployment Status: ${statusText}</h3>
        <div class="deployment-score">
          <div class="score-circle" style="border-color: ${statusColor};">
            <span class="score-text">${data.score}%</span>
          </div>
        </div>
      </div>
      
      <div class="deployment-details">
        <div class="detail-item">
          <span class="detail-label">Total Checks:</span>
          <span class="detail-value">${data.details.total_checks}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Errors:</span>
          <span class="detail-value error-count">${data.details.errors}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Warnings:</span>
          <span class="detail-value warning-count">${data.details.warnings}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Last Check:</span>
          <span class="detail-value">${new Date(data.details.timestamp).toLocaleString()}</span>
        </div>
      </div>
      
      <div class="deployment-message">
        <p>${data.message}</p>
      </div>
      
      <div class="deployment-actions">
        <button onclick="checkDeploymentStatus()" class="refresh-btn">
          🔄 Refresh Check
        </button>
        ${data.ready ? 
          '<button class="deploy-btn" onclick="suggestDeploy()">🚀 Ready to Deploy!</button>' : 
          '<button class="fix-btn" onclick="showFixSuggestions()">🔧 View Fixes</button>'
        }
      </div>
    </div>
  `;
}

function updateHealthIndicator(data) {
  const indicator = document.getElementById('health-indicator');
  if (!indicator) return;

  const isHealthy = data.status === 'healthy';
  const statusColor = isHealthy ? '#4CAF50' : '#F44336';
  const statusIcon = isHealthy ? '🟢' : '🔴';

  indicator.innerHTML = `
    <div class="health-status" style="color: ${statusColor};">
      ${statusIcon} ${data.status.toUpperCase()}
      ${isHealthy ? `(${Math.round(data.uptime)}s uptime)` : ''}
    </div>
  `;
}

function showDeploymentError(errorMessage) {
  const container = document.getElementById('deployment-status-container');
  if (container) {
    container.innerHTML = `
      <div class="deployment-error">
        <h3>❌ Deployment Check Failed</h3>
        <p>Error: ${errorMessage}</p>
        <button onclick="checkDeploymentStatus()" class="retry-btn">
          🔄 Retry Check
        </button>
      </div>
    `;
  }
}

function suggestDeploy() {
  alert('🎉 Your application is ready for deployment! You can now safely deploy to production.');
}

function showFixSuggestions() {
  alert('💡 Check the server console for detailed fix suggestions, or run the deployment checker CLI for more information.');
}

// Auto-check deployment status on page load
document.addEventListener('DOMContentLoaded', function() {
  // Only run if deployment container exists
  if (document.getElementById('deployment-status-container')) {
    checkDeploymentStatus();
  }
  
  // Auto-update health status every 30 seconds
  if (document.getElementById('health-indicator')) {
    checkHealthStatus();
    setInterval(checkHealthStatus, 30000);
  }
});

// Make functions globally available
window.checkDeploymentStatus = checkDeploymentStatus;
window.checkHealthStatus = checkHealthStatus;