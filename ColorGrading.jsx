// Photoshop ExtendScript (JavaScript) - Fixed MVP for Copying Layers
// This script copies a specific layer group ("Color Grading") from the active document
// and pastes it into all other open Photoshop documents, ensuring documents are frontmost before pasting.

function copyAndPasteLayerGroup() {
    var originalDoc = app.activeDocument; // Store the currently active document
    var groupName = "Color Grading"; // Name of the layer group to copy

    try {
        // Find the "Color Grading" layer group
        var colorGradingGroup = originalDoc.layerSets.getByName(groupName);

        // Iterate over all open documents and duplicate the group into them
        for (var i = 0; i < app.documents.length; i++) {
            var targetDoc = app.documents[i];
            if (targetDoc !== originalDoc) { // Avoid copying into the source document
                colorGradingGroup.duplicate(targetDoc); // Directly duplicate the layer group into the target document
            }
        }

        alert("Layer group copied to all open documents.");
    } catch (e) {
        alert("Error: " + e.message); // Display an error message if something goes wrong
    }
}

// Run the function to execute the copy-paste process
copyAndPasteLayerGroup();
