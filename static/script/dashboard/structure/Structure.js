class Structure {
    constructor() {
        // Filled with folders
        /**@type {Folder[]} */
        this.data = []
    }
}

class Folder {
    /**
     * @constructor
     * @param {String} name 
     * @param {Object} options 
     * @param {Structure} sub 
     * @param {Folder} parent
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