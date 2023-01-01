class SubfolderViewManager {

      static files_and_subfolders_list = document.getElementById('files-and-subfolders-list-content')

      static async subfolder_updater(folder_div/*A html element that was clicked*/, from_original /*A boolean*/) {
            if (from_original) {
                  GLOBALS.current_viewed_folder = GLOBALS.directory_handles
                  GLOBALS.subfolder_view_path = [GLOBALS.current_viewed_folder]
            }
            // The name of folder, which is stored in the h3 element in the folder_div
            var folder_name = folder_div.getElementsByTagName('h3')[0].textContent
            var selected_folder = null
            for await (var thing of GLOBALS.current_viewed_folder.values()){
                  if (thing.kind == "directory" && thing.name == folder_name) {
                        selected_folder = thing
                  }
            }
            if (selected_folder == null){
                  console.log("Some error occured");
                  return;
            }
            GLOBALS.current_viewed_folder = selected_folder
            GLOBALS.subfolder_view_path.push(selected_folder)

            
            // The list of files and filders in a subfolder
            var subfolder_fandf_list = await SubfolderViewManager.current_subfolder_fandf_list(selected_folder)

            // Check if its not the root folder to display subfolders
            if (!(GLOBALS.current_viewed_folder == GLOBALS.directory_handles)){
                  await SubfolderViewManager.update_subfolder_view(subfolder_fandf_list,selected_folder.name)
            } else {
                  // Dont wanna show stuff if its the root folder
                  // Cause the other main folder view already does that
                  SubfolderViewManager.files_and_subfolders_list.innerHTML = `
                  <div class>
                        <img src="/static/imgs/folder-icon.png">
                        <h3>Subfolder</h3>
                  </div>
                  `
            }
            ViewUpdater.update_folder_clicks();
      }

      static async current_subfolder_fandf_list(current_viewed_folder_handle) {
            var subfolder_files_and_folders = {
                  'file' : [],
                  'directory' : []
            }
            for await (var thing of current_viewed_folder_handle.values()){
                  if (thing.kind == "file") {
                        subfolder_files_and_folders[thing.kind].push(thing)
                  } else if (thing.kind == "directory") {
                      subfolder_files_and_folders[thing.kind].push(thing)
                  }
            }
            return subfolder_files_and_folders
      }
      
      
      static async update_subfolder_view(subfolder_fandf_list,subfolder_name) {

            // Path view updater
            var subfolder_path_view = document.getElementById('current-subfolder-view-title')
            var subfolder_path_view_text = ""
            for (var folder_handle of GLOBALS.subfolder_view_path) {
                  subfolder_path_view_text += "/" + folder_handle.name
            }
            subfolder_path_view.textContent = subfolder_path_view_text

            // The div to click, to go back to the previous folder
            SubfolderViewManager.files_and_subfolders_list.innerHTML = `
            <div class='subfolderDiv-back'>
                  <img src="/static/imgs/folder-icon.png">
                  <h3>Back from ${subfolder_name}</h3>
            </div>
            `
            // Subfolder files and folders List view maker
            for (var dir of subfolder_fandf_list["directory"]) {
                  var new_folder_div = document.createElement("div")
                  
                  // Give divs that display folders a class
                  new_folder_div.setAttribute("class", "subfolderDiv")
                  var folder_name_text = document.createElement('h3')
                  folder_name_text.textContent = ViewUpdater.folder_title.innerHTML = ViewUpdater.too_long_handler(dir.name, 35);
                  folder_name_text.setAttribute("class", "contentRowText folder sub")
                  var folder_icon = document.createElement('img')
                  folder_icon.src = "/static/imgs/folder-icon.png";
                  var delete_btn = document.createElement("button");
                  var img_delete_btn = document.createElement("img");
                  img_delete_btn.src = "/static/imgs/trash-can.png";
            
                  new_folder_div.appendChild(folder_icon)
                  new_folder_div.appendChild(folder_name_text)
                  delete_btn.appendChild(img_delete_btn);
                  new_folder_div.appendChild(delete_btn);
                  new_folder_div.classList.add("files-and-folders-list-content-div")
                  SubfolderViewManager.files_and_subfolders_list.appendChild(new_folder_div)
            }
      
            for (var file of subfolder_fandf_list["file"]) {
                  var new_div = document.createElement("div")
                  var file_name_text = document.createElement('h3')
                  file_name_text.textContent = ViewUpdater.folder_title.innerHTML = ViewUpdater.too_long_handler(file.name, 35);
                  file_name_text.setAttribute("class", "contentRowText file sub")
      
                  var file_type = file.name.split('.').at(-1)
                  var file_icon = document.createElement('img')
                  if (ViewUpdater.available_files.includes(file_type.toLowerCase())){
                  file_icon.src = `/static/imgs/icons/${file_type.toLowerCase()}.svg`
                  } else {
                  file_icon.src = "/static/imgs/icons/no_icon.svg"
                  }
                  var delete_btn = document.createElement("button");
                  var img_delete_btn = document.createElement("img");
                  img_delete_btn.src = "/static/imgs/trash-can.png";

                  new_div.appendChild(file_icon)
                  new_div.appendChild(file_name_text)
                  delete_btn.appendChild(img_delete_btn);
                  new_div.appendChild(delete_btn);
                  new_div.classList.add("files-and-folders-list-content-div")
                  SubfolderViewManager.files_and_subfolders_list.appendChild(new_div)
            }
            // update_folder_clicks()
            SubfolderViewManager.update_subfolder_clicks()
            SubfolderViewManager.update_subfolder_goback_clicks()
      }

      // For every subfolder of the folder, we want it to be able to also show its content
      static update_subfolder_clicks() {
            // Elements
            var subfolders_divs = document.getElementsByClassName("subfolderDiv");


            // Functions
            for (var folder_div of subfolders_divs){
                  folder_div.addEventListener('click', async (e) => {
                        await SubfolderViewManager.subfolder_updater(e.currentTarget,false);
                  });
            }
      }

      
      static update_subfolder_goback_clicks() {
            // The goback div
            var subfolders_div = document.getElementsByClassName("subfolderDiv-back")[0];
            subfolders_div.addEventListener('click', async (e) => {
                  GLOBALS.subfolder_view_path.pop()
                  GLOBALS.current_viewed_folder = GLOBALS.subfolder_view_path.at(-1)
                  // Going to the 2nd last index of the path, as that was the previous folder before the current one
                  var prev_subfolder_fandf_list = await SubfolderViewManager.current_subfolder_fandf_list(
                        GLOBALS.subfolder_view_path.at(-1)
                  );
                  
                  // Non-div name based updating the subfolder view, thats why repeated code 
                  // v

                  // Check if its not the root folder to display subfolders
                  if (!(GLOBALS.current_viewed_folder == GLOBALS.directory_handles)){
                        await SubfolderViewManager.update_subfolder_view(
                              prev_subfolder_fandf_list,
                              GLOBALS.current_viewed_folder.name
                        )
                  } else {
                        // Dont wanna show stuff if its the root folder
                        // Cause the other main folder view already does that
                        SubfolderViewManager.files_and_subfolders_list.innerHTML = `
                        <div class>
                              <img src="/static/imgs/folder-icon.png">
                              <h3>Subfolder</h3>
                        </div>
                        `
                        var subfolder_path_view = document.getElementById('current-subfolder-view-title')
                        subfolder_path_view.textContent = "/" + GLOBALS.directory_handles.name

                  }
                  ViewUpdater.update_folder_clicks();
            });
      }
}
