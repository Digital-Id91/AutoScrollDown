let isScrolling = false; // Variable to track the scrolling state

// Get the button element
const toggleButton = document.getElementById("toggleButton");

// Set button text based on current state
chrome.storage.local.get(["isScrolling"], (result) => {
  isScrolling = result.isScrolling || false;
  toggleButton.textContent = isScrolling ? "Turn Off" : "Turn On";
});

// Toggle scrolling on button click
toggleButton.addEventListener("click", () => {
  isScrolling = !isScrolling;
  toggleButton.textContent = isScrolling ? "Turn Off" : "Turn On";

  // Store the current state of scrolling
  chrome.storage.local.set({ isScrolling });

  // Send a message to the content script to start/stop scrolling
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { isScrolling });
  });
});
