export var isConnected = false;
export var data = {
  username: "",
  publicKey: "",
};

export function updateUserData(username, publicKey) {
  data.username = username;
  data.publicKey = publicKey;
}
export var phraseList = [];
export var publicKey = "";
var privateKey = "";
import { showLoading, hideLoading } from "./loading.js";
showLoading();

document
  .getElementById("connect-wallet-button-id")
  .addEventListener("click", async () => {
    var tempPhrase = [];
    var gridItems = document.querySelector(".phrase-input");
    tempPhrase = gridItems.value;
    console.log(tempPhrase);
    console.log();
    showLoading();
    if (tempPhrase.length > 0) {
      var bodyJson = {
        PhraseList: tempPhrase,
      };
      const response = await fetch("/loginPhrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJson),
      });
      var results = await response.json();

      if (results._res == "success") {
        data = results.data;
        console.log(data);
        isConnected = true;
        phraseList = tempPhrase;
        document
          .getElementById("grey-background-id-connect")
          .setAttribute("hidden", true);
        hideLoading();
      } else {
        hideLoading();
      }
    }
  });

// Function to copy phrases to clipboard
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function copyPhrasesToClipboard() {
  const phrases = phraseList.join(" ");
  navigator.clipboard
    .writeText(phrases)
    .then(() => {
      console.log("Phrases copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy phrases:", err);
    });
}

function handlePhraseClick(event) {
  const phraseElement = event.currentTarget;
  phraseElement.style.borderColor = getRandomColor();
  copyPhrasesToClipboard();
}

// Add click event listeners to phrase paragraphs
document.addEventListener("DOMContentLoaded", () => {
  const phraseParas = document.querySelectorAll(".phrase-para");
  phraseParas.forEach((para) => {
    para.style.cursor = "pointer";
    para.addEventListener("click", handlePhraseClick);
  });
});

document
  .getElementById("create-button-id")
  .addEventListener("click", async () => {
    document.getElementById("grey-background-id").removeAttribute("hidden");
    //
    showLoading();
    var bodyJson = {
      pass: "00000",
    };
    const response = await fetch("/generatePhrases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
    var results = await response.json();

    if (results._res == "error") {
      hideLoading();
      return;
    } else {
      var yourMnemonics = results._res._mnemonics;
      var phrases = yourMnemonics.split(" ");
      phraseList = phrases;
      privateKey = results._res._privateKey;
      publicKey = results._res._publicKey;
      var gridItems = document.querySelectorAll(".phrase-para");
       console.log("public key is ",   publicKey);
      if (gridItems.length > 0) {
        gridItems.forEach((items, index) => {
          items.innerHTML = phrases[index];
        });
      }
    }
    hideLoading();
  });

document
  .getElementById("cancel-wallet-button-id")
  .addEventListener("click", () => {
    document.getElementById("grey-background-id").setAttribute("hidden", true);
  });

document.getElementById("connect-button-id").addEventListener("click", () => {
  document
    .getElementById("grey-background-id-connect")
    .removeAttribute("hidden");
});

document
  .getElementById("cancel-connect-wallet-button-id")
  .addEventListener("click", () => {
    document
      .getElementById("grey-background-id-connect")
      .setAttribute("hidden", true);
  });

document
  .getElementById("create-wallet-button-id")
  .addEventListener("click", async () => {
    var bodyJson = {
      Keypair: {
        publicKey: publicKey,
        privateKey: privateKey,
      },
    };
    showLoading();
    const response = await fetch("/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
    var results = await response.json();
    document.getElementById("grey-background-id").setAttribute("hidden", true);
    var gridItems = document.querySelectorAll(".phrase-para");
    // console.log(gridItems);
    if (gridItems.length > 0) {
      gridItems.forEach((items, index) => {
        items.innerHTML = "NULL";
      });
    }
    isConnected = true;
    if (results._res == "success") {
      data = results.data;
      console.log(data);
    }
    hideLoading();
  });
hideLoading();
