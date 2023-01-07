

class Struct_Manager {
    /**
     * The main structure, where all other folders will go 
     * @type {Structure}
     */
    static main_structure = undefined

    static instantiate_structure() {
        Struct_Manager.main_structure = new Structure()
    }
    
    /**
     * 
     * @param {String} folder_name 
     * @param {Boolean} og
     * @param {Folder} [parent]
     */
    static remove_folder(folder_name, og, parent) {
        if (og){
            for (var folder of Struct_Manager.main_structure.data) {
                if (folder.name == folder_name) {
                    var index = Struct_Manager.main_structure.data.indexOf(folder)
                    Struct_Manager.main_structure.data.splice(index, 1)
                }
            }
        } else {
            for (var folder of parent.sub.data) {
                if (folder.name == folder_name) {
                    var index = parent.sub.data.indexOf(folder)
                    parent.sub.data.splice(index, 1)
                }
            }
        }
    }

    
}