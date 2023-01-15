

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
            Struct_Manager.main_structure.add_folder(new_folder)
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

    /**@type {Folder} */
    static current_create_folder = undefined
    /**
     * Creates a subfolder, in the current_create_folder
     * This function is executed by clicking on the submit button on the modal
     * @param {String} name - The output name of the function
     */
    static create_subfolder(name) {
        console.log({name});
        console.log(Struct_Manager.current_create_folder)
        let new_folder = new Folder(name, undefined, new Structure(), Struct_Manager.current_create_folder)
        Struct_Manager.current_create_folder.sub.data.push(new_folder)
    }

    /**
     * Shows a list of all doable options you can enter
     * @param {Folder} folder 
     */
    static manage_options(folder) {
        
    }
}

// Seperating the display and the logic
class Structure_View_Manager {
    static structure_div = document.getElementById("folder-structure-content");

    
    /**
     * 
     * @param {HTMLDivElement} previous_div 
     * @param {Structure} if_sub
     */
    static update_structure_view(previous_div, if_sub) {

        /**
         * @type {Structure}
         */
        let current_structure = undefined
        if (if_sub == undefined) {
            current_structure = Struct_Manager.main_structure
            Structure_View_Manager.structure_div.innerHTML = ''
        } else {
            current_structure = if_sub
        }
        
        for (let folder of current_structure.data) {
            let folder_div = document.createElement('div')
            let folder_inner_div = document.createElement('div')
            folder_inner_div.classList.add('structure-folder-div-inner')
            folder_div.classList.add('structure-folder-div')

            let folder_image = document.createElement('img')
            folder_image.src = '/static/imgs/folder-icon.png'

            let folder_name_text = document.createElement('h3')
            folder_name_text.textContent = folder.name

            folder_inner_div.appendChild(folder_image)
            folder_inner_div.appendChild(folder_name_text)

            let add_sub = document.createElement('button')
            add_sub.textContent = "+"
            add_sub.onclick = () => {Structure_View_Manager.new_folder(folder)}

            let options_button = document.createElement('button')
            options_button.textContent = 'Options'
            options_button.onclick = () => {Struct_Manager.manage_options(folder)}

            folder_inner_div.appendChild(add_sub)
            folder_inner_div.appendChild(options_button)


            folder_div.appendChild(folder_inner_div)

            if (previous_div == undefined) {
                Structure_View_Manager.structure_div.appendChild(folder_div)
            } else {
                previous_div.appendChild(folder_div)
            }

            // Making it recursive, so it allows all sub folders
            Structure_View_Manager.update_structure_view(folder_div, folder.sub)
        }
    }

    
    /**
     * 
     * @param {Folder} folder 
     */
    static new_folder(folder) {
        Structure_Modals_Handler.create_modal.style.display = 'block'
        Struct_Manager.current_create_folder = folder
    }
}

class Structure_Modals_Handler {

    static create_modal = document.getElementById('create-modal')
    static create_modal_close = document.getElementById("close-create-modal");
    /**@type {HTMLInputElement} */
    static create_modal_field = document.getElementById("create-modal-field");
    /**@type {HTMLButtonElement} */
    static create_submit_btn = document.getElementById("create-btn");

    static load_modals() {
        Structure_Modals_Handler.load_create_modal()
    }

    /**
     * To load the modal used to create/add folders in the structure
     */
    static load_create_modal() {
        Structure_Modals_Handler.create_modal_close.onclick = function () {
            Structure_Modals_Handler.create_modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target == Structure_Modals_Handler.create_modal) {
                Structure_Modals_Handler.create_modal.style.display = "none";
            }
        };

        Structure_Modals_Handler.create_modal_field.addEventListener('input', () => {
            //Verify if its even a valid name
            let name = Structure_Modals_Handler.create_modal_field.value;
            // If name is too big, no go
            if (name.length > 250) {
                Structure_Modals_Handler.create_submit_btn.disabled = true;
                Structure_Modals_Handler.create_submit_btn.title = 'The name is too long!'
                return
            }
            
            // Regex for checking if a name is valid (aka doesent have special characters like <>:"/\|?*)
            let invalid_regex = `[<>:"\/\\\|\?\*]`
            if (name.match(invalid_regex)) {
                Structure_Modals_Handler.create_submit_btn.disabled = true;
                Structure_Modals_Handler.create_submit_btn.title = 'Invalid characters such as  <>:"/\|?* are not allowed'
                return;
            }

            Structure_Modals_Handler.create_submit_btn.disabled = false
            Structure_Modals_Handler.create_submit_btn.title = ''
        })

        Structure_Modals_Handler.create_submit_btn.disabled = true

        Structure_Modals_Handler.create_submit_btn.addEventListener('click', () =>{
            let name = Structure_Modals_Handler.create_modal_field.value;
            Struct_Manager.create_subfolder(name);
            Structure_Modals_Handler.create_modal_field.value = '';
            Structure_Modals_Handler.create_submit_btn.disabled = true;
            Structure_Modals_Handler.create_modal.style.display = "none";
            Structure_View_Manager.update_structure_view();
        })
    }
}