class DeleteItems {
    // Elements
    static delete_btn = document.getElementsByClassName("delete_btn");

    // Functions
    static async delete_obj(el) {
        // Variables
        const obj_name = el.name;
        const obj_kind = el.dataset.kind;
        const original = el.dataset.og;
        // Let the user confirm whether to delete or not
        const confirmation_box = confirm(`Are you sure you would like to delete the following:
Name: ${obj_name}
Kind: ${obj_kind}`)

        if (confirmation_box == true) {

            if (original == "og") {
                await DeleteItems.search_thru_handle(obj_name, obj_kind, GLOBALS.directory_handles);
                // Update the file and folder list
                await DashboardInput.just_update_all_files()
                ViewUpdater.update_view();

                document.getElementById("current-folder-view-title").innerHTML = GLOBALS.directory_handles.name;
            } else {
                await DeleteItems.search_thru_handle(obj_name, obj_kind, GLOBALS.current_viewed_folder);
                
                // Updating the view
                var subfolder_fandf_list = await SubfolderViewManager.current_subfolder_fandf_list(
                    GLOBALS.current_viewed_folder
                )
                await SubfolderViewManager.update_subfolder_view(
                    subfolder_fandf_list, GLOBALS.current_viewed_folder.name
                )
                ViewUpdater.update_folder_clicks()
            }
            
        } 
    }

    static async search_thru_handle(obj_name, obj_kind, handle) {
        var checker = [];
        for await (var obj of handle.values()) {
            if (obj.name == obj_name && obj.kind == obj_kind) {
                if (obj_kind == "directory") {
                    await handle.removeEntry(obj.name, {recursive: true});
                } else {
                    await handle.removeEntry(obj.name);
                }
            }
            
            // Push every object from the handle
            checker.push(obj);
        }
        
        if (handle == GLOBALS.directory_handles) {
            await DeleteItems.check_if_empty(checker, "og");
        } else {
            await DeleteItems.check_if_empty(checker, "!og");
        }
    }

    static async check_if_empty(list_of_obj, og) {
        console.log(list_of_obj.length - 1)
        console.log(og)
        // Elements
        var folder_list = document.getElementById("files-and-folders-list-content");
        console.log(folder_list)
        var subfolder_list = document.getElementById("files-and-subfolders-list-content");

        if (list_of_obj.length - 1 == 0) {
            if (og == "og") {
                console.log("AHA")
                folder_list.innerHTML = `<div id="placeholder-folder" class="placeholder-obj"><img src="/static/imgs/folder-icon.png"><h3>Folder Name</h3><button class="delete-btn placeholder-obj"><img src="/static/imgs/trash-can.png"></button></div>`
            } else {
                subfolder_list.innerHTML = `<div id="placeholder-subfolder" class="placeholder-obj"><img src="/static/imgs/folder-icon.png"><h3>Subfolder Name</h3><button class="delete-btn placeholder-obj"><img src="/static/imgs/trash-can.png"></button></div>`
            }
        }
    }
}