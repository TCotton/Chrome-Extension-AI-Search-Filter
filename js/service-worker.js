'use strict'

const RULES_JSON_URL = chrome.runtime.getURL('ruleset/rules.json');
let RULES_RULESET = [];

(async function loadRuleset() {
    try {
        const raw = await (await fetch(RULES_JSON_URL)).json();
        RULES_RULESET = raw.map(rule => ({
            selector: rule.selector,
            domain: rule.domain,
        }));
        console.log('[Cosmetic] ruleset loaded', RULES_RULESET.length);
    } catch (err) {
        console.error('[Cosmetic] failed to load ruleset', err);
        RULES_RULESET = [];
    }
})();

chrome.declarativeNetRequest.getMatchedRules(
    {ruleNames: RULES_RULESET.map(rule => rule.selector), resourceTypes: ['DOCUMENT']}
).then((rules) => {
    console.log('Matched rules:', rules);
}).catch((error) => {
    console.error('Error fetching matched rules:', error);
}
)