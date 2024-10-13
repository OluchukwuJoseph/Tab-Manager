/**
 * Adds a new URL to the list of immune tabs.
 * Immune tabs are protected from being closed by the extension's cleanup process.
 * The URL is stored in Chrome's local storage.
 *
 * @param {string} url - The URL of the tab to be added to the immune tabs list.
 * @returns {Promise<string>} - The URL that was successfully added to the immune tabs.
 */
async function addImmuneTab(url) {
  // Retrieve the current list of immune tabs from local storage
  const result = await chrome.storage.local.get('immuneTabs');
  const immuneTabs = result.immuneTabs || [];
  // Add the new URL to the immune tabs array
  immuneTabs.push(url);

  // Save the updated list of immune tabs back to local storage
  await chrome.storage.local.set({ immuneTabs });

  return url;
}

/**
 * Retrieves the list of immune tabs from Chrome's local storage.
 * Immune tabs are tabs that have been marked to be protected from automatic closing.
 *
 * @returns {Promise<Array<string>>} - An array of URLs representing the immune tabs.
 * If no immune tabs exist, an empty array is returned.
 */
async function getImmuneTabs() {
  // Retrieve the immuneTabs from local storage, or initialize an empty array if not present
  const result = await chrome.storage.local.get('immuneTabs');
  
  // If immuneTabs exist, return them, otherwise return an empty array
  const immuneTabs = result.immuneTabs || [];

  return immuneTabs;
}
