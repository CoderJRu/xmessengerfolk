export var open;
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.querySelector(".hamburger").addEventListener("click", async () => {
  open = !open;
  ToggleHamburger();
});
export function ToggleHamburger() {
  if (open) {
    document.querySelector(".hamburger").classList.toggle("active");
    document.querySelector(".hamburger-plane").classList.toggle("active");
    document.querySelector(".xm-ul-menu").classList.toggle("active");
  } else {
    document.querySelector(".hamburger").classList.remove("active");
    document.querySelector(".hamburger-plane").classList.remove("active");
    document.querySelector(".xm-ul-menu").classList.remove("active");
  }
}

document.querySelector("html").addEventListener("mousedown", async function () {
  if (!open) return;
  await delay(500);
  if (open) {
    open = false;
  }
  ToggleHamburger();
});
