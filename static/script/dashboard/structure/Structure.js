class Structure {
    constructor() {
        // Filled with folders
        /**@type {Folder[]} */
        this.data = []
    }

    /**
     * Adds a folder to the structure
     * @param {Folder} folder - The folder to add to the structure 
     * @param {Boolean} [front] - True if you want to add the folder at front, pushes the folder to the back if no paramater
     */
    add_folder(folder, front) {
        if (front === true) {
            this.data.unshift(folder)
        } else {
            this.data.push(folder)
        }
    }
}

/**The Folder class.*/
class Folder {
    /**
     * Instantiating the folder
     * @param {String} name - Name of the folder
     * @param {Object} options - Options by which the folder will take in files
     * @param {Structure} sub - The subdirectories of the folder
     * @param {Folder} parent - The parent of the folder.
     */
    constructor(name, options, sub, parent) {
        /** @type {String}*/
        this.name = name;

        /** @type {Object}*/
        this.options = options;

        /** @type {Structure}*/
        this.sub = sub

        /**@type {Folder} */
        this.parent = parent
    }
}