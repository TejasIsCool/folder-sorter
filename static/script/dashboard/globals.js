// GLOBALS, so that its easier to know in other code when we using these variables
class GlobalVariables {
    constructor () {
        // The actual folder object of the selected folder
        this.directory_handles = undefined

        // Stores the list of all files and folders of the selected folder
        this.all_files = {
            /**@type {FileSystemFileHandle[]}*/
            "file": [],
            /**@type {FileSystemDirectoryHandle[]}*/
            "directory": []
        }

        // Subfolder navigation items
        //// Current subfolder handle
        this.current_viewed_folder = this.directory_handles
        //// The path to current subfolder, relative to the directory_handles
        this.subfolder_view_path = []
    }
}

// Use GLOBALS.var_name to access those variables
const GLOBALS = new GlobalVariables()