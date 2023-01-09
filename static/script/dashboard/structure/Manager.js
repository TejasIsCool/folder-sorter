

class Struct_Manager {
    /**
     * The main structure, where all other folders will go 
     * @type {Structure}
     */
    static main_structure = undefined

    static instantiate_structure() {
        Struct_Manager.main_structure = new Structure()

        // Filling the structure with the existing folders
        var directories = GLOBALS.all_files['directory']
        for (var folder of directories) {
            var new_folder = new Folder(folder.name, undefined, new Structure(), undefined)
            Struct_Manager.main_structure.add_folder(folder)
        }
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

// Seperating the display and the logic
class Structure_View_Manager {
    static structure_div = document.getElementById("folder-structure-content");

    static update_structure_view() {
        Structure_View_Manager.structure_div.innerHTML = ''
        for (var folder of Struct_Manager.main_structure.data) {

            var folder_div = document.createElement('div')
            folder_div.classList.add('structure-folder-div')

            var folder_image = document.createElement('img')
            folder_image.src = '/static/imgs/folder-icon.png'

            var folder_name_text = document.createElement('h3')
            folder_name_text.textContent = folder.name

            folder_div.appendChild(folder_image)
            folder_div.appendChild(folder_name_text)

            Structure_View_Manager.structure_div.appendChild(folder_div)
        }
    }
}