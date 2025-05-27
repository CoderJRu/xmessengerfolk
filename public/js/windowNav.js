import { isConnected } from "./connectWallet.js";
var currentWindowIndex = 0;
document.getElementById("home-connect").addEventListener("click", function () {
  console.log(currentWindowIndex);
  if (currentWindowIndex != 0)
    if (isConnected == false) {
      console.log(currentWindowIndex);
      currentWindowIndex = 0;
      refresh();
    }
});
document
  .getElementById("dashboard-index")
  .addEventListener("click", function () {
    console.log(currentWindowIndex);
    if (currentWindowIndex != 1) {
      console.log(currentWindowIndex);
      currentWindowIndex = 1;
      refresh();
    }
  });
document
  .getElementById("crypto-transfer")
  .addEventListener("click", function () {
    console.log(currentWindowIndex);
    if (currentWindowIndex != 2) {
      console.log(currentWindowIndex);
      currentWindowIndex = 2;
      refresh();
    }
  });
document.getElementById("chat").addEventListener("click", function(){
  console.log(currentWindowIndex);
    if (currentWindowIndex != 3) {
      console.log(currentWindowIndex);
      currentWindowIndex = 3;
      refresh();
    }
});

document.getElementById("nodes").addEventListener("click", function(){
  console.log(currentWindowIndex);
    if (currentWindowIndex != 4) {
      console.log(currentWindowIndex);
      currentWindowIndex = 4;
      refresh();
    }
});

document.getElementById("treasury").addEventListener("click", function(){
  console.log(currentWindowIndex);
    if (currentWindowIndex != 5) {
      console.log(currentWindowIndex);
      currentWindowIndex = 5;
      refresh();
    }
});
function refresh() {
  if (currentWindowIndex == 0) {
    document.querySelector(".home-contents").classList.toggle("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.remove("active");
    document.querySelector(".treasury-plane").classList.remove("active");
  } else if (currentWindowIndex == 1) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.toggle("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.remove("active");
    document.querySelector(".treasury-plane").classList.remove("active");
  } else if (currentWindowIndex == 2) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.toggle("active");
    document.querySelector(".nodes-plane").classList.remove("active");
    document.querySelector(".treasury-plane").classList.remove("active");
  } else if (currentWindowIndex == 3) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.toggle("active");
    document.querySelector(".nodes-plane").classList.remove("active");
    document.querySelector(".treasury-plane").classList.remove("active");
  } else if (currentWindowIndex == 4) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.toggle("active");
    document.querySelector(".treasury-plane").classList.remove("active");
  } else if (currentWindowIndex == 5) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.remove("active");
    document.querySelector(".treasury-plane").classList.toggle("active");
  }
  

  
}

// Toggle switch functionality for swap/send
function handleToggleSwitch(isChecked) {
  if (isChecked) {
    // Switch is ON - Show Send
    document.getElementById("swap-reg").setAttribute("hidden", true);
    document.getElementById("send-reg").removeAttribute("hidden");
    // Sync both toggles
    document.getElementById("swap-send-toggle").checked = true;
    document.getElementById("swap-send-toggle-send").checked = true;
  } else {
    // Switch is OFF - Show Swap
    document.getElementById("send-reg").setAttribute("hidden", true);
    document.getElementById("swap-reg").removeAttribute("hidden");
    // Sync both toggles
    document.getElementById("swap-send-toggle").checked = false;
    document.getElementById("swap-send-toggle-send").checked = false;
  }
}

// Add event listeners to both toggles
document.getElementById("swap-send-toggle").addEventListener("change", function() {
  handleToggleSwitch(this.checked);
});

document.getElementById("swap-send-toggle-send").addEventListener("change", function() {
  handleToggleSwitch(this.checked);
});
//




document.getElementById("coin-list-id").addEventListener("click", ()=>{
  document.getElementById("coin-list-id").style.display = "none";
})

document.querySelector(".swap-div-height-mod").addEventListener("click", ()=>{
   document.getElementById("coin-list-id").style.display = "flex";
})
refresh();
