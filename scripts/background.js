chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');

  chrome.storage.local.get(['duplicateTimeout', 'unusedTimeout'], (result) => {
    console.log(`Duplicate Timeout: ${result.duplicateTimeout || 1}`);
    console.log(`Unused Timeout: ${result.unusedTimeout || 1}`);
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(`Tab ${tabId} was removed`);
});
