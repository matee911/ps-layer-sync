// Photoshop ExtendScript (JavaScript) - Copy and optionally replace a single layer group in other open documents
// This script copies a specific layer group from the active document
// and pastes it into selected open Photoshop documents, with an option to replace existing groups.

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
 * Prompts the user to select a layer group and choose whether to replace existing groups.
 * @param {Array} layerGroups - An array of available layer group names.
 * @returns {Object|null} - An object containing the selected group name and replace option, or null if canceled.
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
    var replaceExisting = confirm("Do you want to replace the existing '" + groupName + "' group in target documents?\n\nIf you choose 'Yes', all existing groups with this name will be removed and replaced.\nIf you choose 'No', the group will be copied alongside any existing groups in the target documents.");
    return { groupName: groupName, replaceExisting: replaceExisting };
}

/**
 * Removes all instances of the specified layer group in the target document.
 * @param {Document} targetDoc - The document where the groups should be removed.
 * @param {string} groupName - The name of the group to remove.
 */
function removeExistingGroup(targetDoc, groupName) {
    try {
        var groupsToRemove = [];
        for (var i = targetDoc.layerSets.length - 1; i >= 0; i--) {
            if (targetDoc.layerSets[i].name === groupName) {
                groupsToRemove.push(targetDoc.layerSets[i]);
            }
        }
        for (var j = 0; j < groupsToRemove.length; j++) {
            groupsToRemove[j].remove();
        }
    } catch (e) {
        // Do nothing if no matching groups exist
    }
}

/**
 * Duplicates or replaces the specified layer group in all other open documents.
 * @param {string} groupName - The name of the layer group to duplicate.
 * @param {Document} originalDoc - The document containing the layer group.
 * @param {boolean} replaceExisting - Whether to replace existing groups in target documents.
 */
function copyLayerGroupToDocuments(groupName, originalDoc, replaceExisting) {
    try {
        var colorGradingGroup = originalDoc.layerSets.getByName(groupName);

        for (var i = 0; i < app.documents.length; i++) {
            var targetDoc = app.documents[i];
            if (targetDoc !== originalDoc) {
                app.activeDocument = targetDoc; // Switch to the target document

                if (replaceExisting) {
                    removeExistingGroup(targetDoc, groupName);
                }

                app.activeDocument = originalDoc; // Switch back to original document
                colorGradingGroup.duplicate(targetDoc); // Duplicate directly into the target document
            }
        }

        app.activeDocument = originalDoc; // Ensure we return to the original document
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
    var selection = promptForLayerGroup(layerGroups);
    if (selection) {
        copyLayerGroupToDocuments(selection.groupName, originalDoc, selection.replaceExisting);
    }
}

// Execute the function
copyAndPasteLayerGroup();
