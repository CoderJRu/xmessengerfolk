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
function refresh() {
  if (currentWindowIndex == 0) {
    document.querySelector(".home-contents").classList.toggle("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.remove("active");
  } else if (currentWindowIndex == 1) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.toggle("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.remove("active");
  } else if (currentWindowIndex == 2) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.toggle("active");
    document.querySelector(".nodes-plane").classList.remove("active");
  } else if (currentWindowIndex == 3) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.toggle("active");
    document.querySelector(".nodes-plane").classList.remove("active");
  } else if (currentWindowIndex == 4) {
    document.querySelector(".home-contents").classList.remove("active");
    document.querySelector(".dashboard-plane").classList.remove("active");
    document.querySelector(".swap-plane").classList.remove("active");
    document.querySelector(".chat-plane").classList.remove("active");
    document.querySelector(".nodes-plane").classList.toggle("active");
  }
  

  
}

document.getElementById("swap-return").addEventListener("click", () => {
  document.getElementById("send-reg").setAttribute("hidden", true);
  document.getElementById("swap-reg").removeAttribute("hidden");
});
document.getElementById("send-return").addEventListener("click", () => {
  document.getElementById("swap-reg").setAttribute("hidden", true);
  document.getElementById("send-reg").removeAttribute("hidden");
});
//




document.getElementById("coin-list-id").addEventListener("click", ()=>{
  document.getElementById("coin-list-id").style.display = "none";
})

document.querySelector(".swap-div-height-mod").addEventListener("click", ()=>{
   document.getElementById("coin-list-id").style.display = "flex";
})
refresh();
