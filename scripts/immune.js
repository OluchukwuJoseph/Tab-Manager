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

/**
 * Retrieves detailed information about the immune tabs, including title, URL, time running, memory usage, and a screenshot.
 *
 * @returns {Promise<Array<Object>>} - Returns a list of objects containing tab title, url, runningTime, and memoryUsage about each immune tab.
 * 
 */
async function getImmuneTabsInfo() {
  // Retrieve the immune tab URLs from storage
  const result = await chrome.storage.local.get('immuneTabs');
  const immuneTabs = result.immuneTabs || [];
  
  // Store details for each immune tab
  let immuneTabDetails = [];

  for (const url of immuneTabs) {
    // Query for tabs that match the immune tab URL
    const tabs = await chrome.tabs.query({ url });

    if (tabs.length > 0) {
      const tab = tabs[0]; // Assume only one tab matches the immune URL

      // Get tab title (name)
      const title = tab.title || 'Unknown Title';

      // Calculate how long the tab has been running (in milliseconds)
      const runningTime = Date.now() - tab.lastAccessed;

      // Convert running time to hours
      const runningTimeInHours = (runningTime / 1000 / 60 / 60).toFixed(2); // Rounded to 2 decimal places

      // Attempt to retrieve memory consumption information using the processes API
      let memoryUsage = 0; // Default if memory info isn't available
      try {
        const processId = await chrome.processes.getProcessIdForTab(tab.id);
        const processInfo = await chrome.processes.getProcessInfo(processId, true);
        memoryUsage = processInfo.privateMemory // Get memory if available
        ? (processInfo.privateMemory / (1024 * 1024)).toFixed(2) // Convert to MB
        : 0; // If memory is unavailable
      } catch (err) {
        console.error('Error retrieving memory info:', err);
      }

      // Add the immune tab details to the array
      immuneTabDetails.push({
        title: title,
        url: tab.url,
        runningTime: runningTimeInHours, // Running time in hours
        memoryUsage: memoryUsage
      });
    }
  }

  return immuneTabDetails;
}

export { addImmuneTab, getImmuneTabs, getImmuneTabsInfo };
