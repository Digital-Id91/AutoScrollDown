let scrollInterval;

// Function to scroll to the bottom
function scrollToBottom() {
    const scrollElement = document.querySelector('.uir-list-body-wrapper.scrollarea');

    if (scrollElement) {
        scrollInterval = setInterval(() => {
            scrollElement.scrollBy(0, 100);
            if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
                clearInterval(scrollInterval);
            }
        }, 100);
    }
}

// Function to stop scrolling
function stopScrolling() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        console.log("Scrolling stopped.");
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.isScrolling) {
        console.log("Starting auto scroll...");
        scrollToBottom();
    } else {
        console.log("Stopping auto scroll...");
        stopScrolling();
    }
});

// Automatically start scrolling if it was previously on
chrome.storage.local.get(["isScrolling"], (result) => {
    if (result.isScrolling) {
        scrollToBottom();
    }
});

