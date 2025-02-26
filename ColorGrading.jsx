// Photoshop ExtendScript (JavaScript) - Copy a single layer group to other open documents
// This script copies a specific layer group from the active document
// and pastes it into selected open Photoshop documents.

/**
 * Retrieves the names of all layer groups in the given document.
 * @param {Document} doc - The Photoshop document to retrieve layer groups from.
 * @returns {Array} - An array of layer group names.
 */
function getLayerGroups(doc) {
    var layerGroups = [];
    for (var i = 0; i < doc.layerSets.length; i++) {
        layerGroups.push(doc.layerSets[i].name);
    }
    return layerGroups;
}

/**
 * Checks if an array contains a specific value (for compatibility with older JavaScript versions in Photoshop).
 * @param {Array} arr - The array to check.
 * @param {string} value - The value to search for.
 * @returns {boolean} - True if the value exists, otherwise false.
 */
function arrayIncludes(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}

/**
 * Prompts the user to select a layer group to copy.
 * @param {Array} layerGroups - An array of available layer group names.
 * @returns {string|null} - The selected group name, or null if canceled.
 */
function promptForLayerGroup(layerGroups) {
    if (layerGroups.length === 0) {
        alert("No layer groups found in the active document.");
        return null;
    }
    var groupName = prompt("Enter the name of the layer group to copy:", layerGroups[0]);
    if (!groupName || !arrayIncludes(layerGroups, groupName)) {
        alert("Invalid selection or layer group does not exist.");
        return null;
    }
    return groupName;
}

/**
 * Duplicates the specified layer group in all other open documents.
 * @param {string} groupName - The name of the layer group to duplicate.
 * @param {Document} originalDoc - The document containing the layer group.
 */
function copyLayerGroupToDocuments(groupName, originalDoc) {
    try {
        var colorGradingGroup = originalDoc.layerSets.getByName(groupName);
        var confirmPaste = confirm("Paste '" + groupName + "' into all open documents?");
        if (!confirmPaste) return;

        for (var i = 0; i < app.documents.length; i++) {
            var targetDoc = app.documents[i];
            if (targetDoc !== originalDoc) {
                colorGradingGroup.duplicate(targetDoc); // Duplicate directly into the target document
            }
        }

        alert("Layer group '" + groupName + "' copied to all open documents.");
    } catch (e) {
        alert("Error: " + e.message);
    }
}

/**
 * Main function that orchestrates the copying and pasting of a layer group.
 */
function copyAndPasteLayerGroup() {
    var originalDoc = app.activeDocument;
    var layerGroups = getLayerGroups(originalDoc);
    var groupName = promptForLayerGroup(layerGroups);
    if (groupName) {
        copyLayerGroupToDocuments(groupName, originalDoc);
    }
}

// Execute the function
copyAndPasteLayerGroup();
