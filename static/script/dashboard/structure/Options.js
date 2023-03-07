// Like an interface class
class Options { 
    constructor() {
        /** @type {String}*/
        this.name="Options"
        
    }

    /**
     * Returns a list of folders with the files sorted in them
     * @param {FileSystemFileHandle[]} files_list
     * @returns {Folder[]}}
     */
    sort(files_list) {
        
    }
}

/**
 * Loads all the options class files
 */
function options_loader() {
    scripts = ['Alphabetical','TimePeriod']
    for (let script of scripts) {
        let scripttag = document.createElement('script');
        script.type = 'text/javascript';
        scripttag.src = '/static/script/dashboard/structure/Options/' + script + '.js';
        document.head.appendChild(scripttag);
    }
}
