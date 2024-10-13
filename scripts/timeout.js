// This script contains timeout setting and retrieval functions for the Chrome extension's tab management system.

/**
 * Sets the timeout for duplicate tabs.
 * This value will be stored in Chrome's local storage and can be used
 * by other parts of the extension to manage duplicate tabs.
 *
 * @param {number} duplicateTimeout - The timeout value (in hours) for duplicate tabs.
 * @returns {Promise<string>} - A confirmation message indicating the timeout was successfully set.
 */
async function setDuplicateTimeout(duplicateTimeout) {
  // Store the duplicate timeout value in Chrome local storage
  await chrome.storage.local.set({ duplicateTimeout });

  return `Duplicate timeout set to ${duplicateTimeout} hour(s)`;
}

/**
 * Sets the timeout for unused tabs.
 * This value will be stored in Chrome's local storage and can be used
 * by other parts of the extension to manage unused tabs.
 *
 * @param {number} unusedTimeout - The timeout value (in hours) for unused tabs.
 * @returns {Promise<string>} - A confirmation message indicating the timeout was successfully set.
 */
async function setUnusedTimeout(unusedTimeout) {
  // Store the unused timeout value in Chrome local storage
  await chrome.storage.local.set({ unusedTimeout });

  return `Unused timeout set to ${unusedTimeout} hour(s)`;
}

/**
 * Retrieves the timeouts for both duplicate and unused tabs from Chrome local storage.
 * If the values are not set, it defaults to 1 hour for both.
 * 
 * @returns {Promise<Array<number>>} - Resolves with an array containing the duplicate timeout and unused timeout.
 */
async function getTimeout() {
  // Retrieve both duplicate and unused timeout values from Chrome local storage
  const result = await chrome.storage.local.get(['duplicateTimeout', 'unusedTimeout']);

  // Fallback to 1 if no timeout is set for either duplicate or unused tabs
  const duplicateTimeout = result.duplicateTimeout || 1;
  const unusedTimeout = result.unusedTimeout || 1;

  // Return the retrieved timeouts as an array
  return [duplicateTimeout, unusedTimeout];
}
