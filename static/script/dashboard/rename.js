class RenameItems {
    // Elements
    static modal_close = document.getElementById("close-rename-modal");
    static modal = document.getElementById("rename-modal");
    static modal_field = document.getElementById("rename-modal-field");
    static submit_btn = document.getElementById("rename-btn");
    static div_info = null

    /*static async handle_renaming_folders(dir_handle) {
        dir_copy = await dir_handle.getDirectoryHandle(`${dir_handle.name}2`, {create:true}); // Add a 2 as you cannot have 2 directories of the same name in the same parent directory
        
        for (thing of dir_copy) {
            if (thing.kind == "file") {
                await thing.move(dir_copy);
            } else {
                console.log('placeholder')
                // Add some kind of recursive code that creates a new copy of the folder and moves all the files into that new copy
            }
        }
    }*/

    static handle_modal() {
        RenameItems.modal_close.onclick = function () {
            RenameItems.modal.style.display = "none";
        };
        
        window.onclick = function (event) {
            if (event.target == RenameItems.modal) {
                RenameItems.modal.style.display = "none";
            }
        };

        RenameItems.submit_btn.addEventListener("click", async () => {
            //submit_btn.disabled = true
            // Exit the modal
            RenameItems.modal.style.display = "none";
        
            // Get new name
            var new_name = RenameItems.modal_field.value;
            
            var div_data = RenameItems.div_info
            if (div_data !== null){
                    await RenameItems.actually_rename_item(div_data[0], new_name, div_data[2], div_data[1]);
            } else {
                console.log("Some error occured!?")
            }
            RenameItems.div_info = null

            // Updating the view
            await DashboardInput.just_update_all_files()
            ViewUpdater.update_view();
        });
    }

    static async modal_input(divName) {
        RenameItems.modal.style.display = "block";
        RenameItems.modal_field.value = divName;
    }

    static async rename_item(divName) {
        if (divName.classList.contains("folder")) {
            console.log("Cannot do this yet.");
            return
        }
        
        var current_name = divName.getAttribute("name");
    
        // Input the original name into input field.
        await RenameItems.modal_input(current_name);
    
        // Check if object is a file or a directory/folder.
        if (divName.classList.contains("folder")) {
            console.log("Cannot do this yet.");
        } else if (divName.classList.contains("file")) {
            var obj_type = "file";
        }
    
        if (divName.classList.contains("og")) {
            var og_or_sub = true;
        } else {
            var og_or_sub = false;
        }
        RenameItems.div_info = [current_name, obj_type, og_or_sub]
    }

    // TODO : Need to error check, if the flag is not enabled, they wont be able to rename

    static async actually_rename_item(old_name, new_name, og_or_sub, type) {
        // Check if the clicked file/folder the main folder or apart of a subfolder: true = main, false = sub
        if (og_or_sub == true) {
            for await (var thing of GLOBALS.directory_handles.values()) {
                if (thing.kind == type && thing.name == old_name) {
                    if (thing.kind == "file") {
                        await thing.move(new_name);
                    }
                }
            }
        } else {
            console.log("Not dont yet")
            for await (var thing of GLOBALS.current_viewed_folder.values()) {
                if (thing.kind == type && thing.name == old_name) {
                    if (thing.kind == "file") {
                        await thing.move(new_name);
                    }
                }
            }
            // Updating the view
            var subfolder_fandf_list = await SubfolderViewManager.current_subfolder_fandf_list(
                GLOBALS.current_viewed_folder
            )
            await SubfolderViewManager.update_subfolder_view(
                subfolder_fandf_list, GLOBALS.current_viewed_folder.name
            )
        }
        // Else we navigate to the current folder we are on
        
        
    }

}

