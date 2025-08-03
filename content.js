/**
 * This function finds the search input field on Google and appends "-ai"
 * to the query if it's not already present.
 */
function modifySearchQuery() {
    // Find the search input field on the page. Google uses a <textarea> with the name "q".
    const searchInput = document.querySelector('textarea[name="q"]') || document.querySelector('arialabel[for="Search"]');

    if (searchInput && searchInput.value) {
        // Check if the query already contains "-ai" to avoid adding it multiple times.
        // A regular expression is used to check for "-ai" as a whole word at the end.
        if (!/\s-ai\b/.test(searchInput.value)) {
            searchInput.value += " -ai";
        }
    }
}

// Find the form that contains the search input.
const searchForm = document.querySelector('form[action="/search"]');

// Listen for the "submit" event on the form.
// This event fires when you press Enter or click the search button.
if (searchForm) {
    searchForm.addEventListener('submit', modifySearchQuery);
}
