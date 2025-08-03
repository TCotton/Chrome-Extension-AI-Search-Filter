/**
 * Listens for network requests to Google Search and modifies the query.
 * This function is registered as a listener for the onBeforeRequest event.
 */
function modifySearchRequest(details) {
    // Parse the URL to easily access its parameters.
    const url = new URL(details.url);
    console.log("Intercepted request to:", url.href);

    // Get the value of the search query parameter 'q'.
    const query = url.searchParams.get('q');
    console.log("Current query:", query);

    // Proceed only if a query exists and it does not already contain '-ai'.
    // We check for '-ai' as a whole word to avoid modifying it if it's part of another word.
    if (query && !/\b-ai\b/.test(query)) {
        // Append ' -ai' to the existing query.
        const newQuery = query + ' -ai';
        console.log("Modified query:", newQuery);

        // Update the 'q' parameter in the URL.
        url.searchParams.set('q', newQuery);

        // Tell Chrome to redirect to the newly constructed URL.
        return {
            redirectUrl: url.href
        };
    }

    // If no modification is needed, return an empty object to continue the request as is.
    return {};
}

/**
 * Add the listener to the chrome.webRequest.onBeforeRequest event.
 *
 * - The first argument is the callback function that will be executed.
 * - The second argument filters which requests we want to intercept.
 *   We are only interested in main frame (the top-level page) requests to google.com/search.
 * - The third argument ['blocking'] is required for modifying the request.
 *   Note: For Manifest V3, 'blocking' is being replaced by declarativeNetRequest for many use cases,
 *   but is still used for this type of dynamic redirection.
 */
chrome.webRequest.onBeforeRequest.addListener(
    modifySearchRequest,
    {
        urls: ["*://www.google.com/search?*"],
        types: ["main_frame"]
    },
    ["blocking"]
);