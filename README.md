# Photoshop Layer Group Sync Script

This Photoshop ExtendScript allows you to **copy a specific layer group** 
from the active document and paste it into **all open Photoshop documents**.
It was originally created for **synchronizing color grading layers**, but it may work for other types of layer groups as well making it useful for general workflow automation. (though not extensively tested).
Optionally, it can **replace existing groups** with the same name in the target documents.

## Features

- ✅ Copy a selected layer group to multiple open documents.
- ✅ Option to replace existing groups with the same name.
- ✅ Automatically removes all previous instances of the selected group (if chosen).

## Installation & Usage

### Run the Script

1. Download the script from [here](https://github.com/matee911/ps-layer-sync/archive/refs/tags/v1.0-rc1.zip) and extract the `PSLayersSync.jsx` file from the ZIP archive.
1. Open **multiple Photoshop documents** and make sure the document containing the layer group you want to copy (i.e. Color Grading) is the active tab.
2. Go to **File → Scripts → Browse**. 
3. Select the saved `PSLayersSync.jsx` script file.
4. Enter the name of the layer group you want to copy.
5. Choose whether to replace existing groups.
6. The layer group will be copied to all open documents!

### Example Use Cases

- Applying consistent color grading across multiple images in no time.

## Support This Project ❤️

This script is **free to use**, but if you find it useful, consider [buying me a coffee](https://buycoffee.to/matee.photo) ☕ to support future improvements!

## License

This script is released under the MIT License – use, modify, and distribute freely!
