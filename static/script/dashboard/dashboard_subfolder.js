
function update_folder_clicks() {
      // Elements
      var folders_divs = document.getElementsByClassName("folderDiv");


      // Functions
      for (var folder_div of folders_divs){
            folder_div.addEventListener('click', async (e) => {
                  await subfolder_updater(e.currentTarget,true);
            });
      }
}


async function subfolder_updater(folder_div, from_original) {
      if (from_original) {
            current_viewed_folder = directory_handles
      }
      folder_name = folder_div.getElementsByTagName('h3')[0].textContent
      console.log(folder_name)
      console.log(current_viewed_folder)
      var selected_folder = null
      for await (thing of current_viewed_folder.values()){
            if (thing.kind == "directory" && thing.name == folder_name) {
                  selected_folder = thing
            }
      }
      if (selected_folder == null){
            console.log("Some error occured");
            return;
      }
      current_viewed_folder = selected_folder
      subfolder_view_path.push(current_viewed_folder)
      await current_subfolder_to_files_and_folders(current_viewed_folder)
}

async function current_subfolder_to_files_and_folders(current_viewed_folder_handle) {
      var subfolder_files_and_folders = {
            'file' : [],
            'directory' : []
      }
      for await (thing of current_viewed_folder_handle.values()){
            if (thing.kind == "file") {
                  subfolder_files_and_folders[thing.kind].push(thing)
            } else if (thing.kind == "directory") {
                console.log(thing);
                subfolder_files_and_folders[thing.kind].push(thing)
            }
      }
      // Check if its not the root folder to display subfolders
      if (!(current_viewed_folder == directory_handles)){
            await update_subfolder_view(subfolder_files_and_folders,current_viewed_folder_handle.name)
      } else {
            files_and_subfolders_list.innerHTML = `
            <div class>
                  <img src="/static/imgs/folder-icon.png">
                  <h3>Subfolder</h3>
            </div>
            `
      }
}


const files_and_subfolders_list = document.getElementById('files-and-subfolders-list-content')
async function update_subfolder_view(subfolder_files_and_folders,sub_folder_name) {
      files_and_subfolders_list.innerHTML = `
      <div class='subfolderDiv-back'>
            <img src="/static/imgs/folder-icon.png">
            <h3>Back from ${sub_folder_name}</h3>
      </div>
      `
      for (dir of subfolder_files_and_folders["directory"]) {
            var new_folder_div = document.createElement("div")
            
            // Give divs that display folders a class
            new_folder_div.setAttribute("class", "subfolderDiv")
            var folder_name_text = document.createElement('h3')
            folder_name_text.textContent = dir.name
            var folder_icon = document.createElement('img')
            folder_icon.src = "/static/imgs/folder-icon.png";
            
            new_folder_div.appendChild(folder_icon)
            new_folder_div.appendChild(folder_name_text)
            new_folder_div.classList.add("files-and-folders-list-content-div")
            files_and_subfolders_list.appendChild(new_folder_div)
      }

      for (file of subfolder_files_and_folders["file"]) {
            var new_div = document.createElement("div")
            var file_name_text = document.createElement('h3')
            file_name_text.textContent = file.name

            var file_type = file.name.split('.').at(-1)
            var file_icon = document.createElement('img')
            if (available_files.includes(file_type.toLowerCase())){
            file_icon.src = `/static/imgs/icons/${file_type.toLowerCase()}.svg`
            } else {
            file_icon.src = "/static/imgs/icons/no_icon.svg"
            }

            //file_icon.classList.add('files-and-folders-list-content-img')
            
            new_div.appendChild(file_icon)
            new_div.appendChild(file_name_text)
            new_div.classList.add("files-and-folders-list-content-div")
            files_and_subfolders_list.appendChild(new_div)
      }
      update_subfolder_clicks()
      update_subfolder_goback_clicks()
}


// For every subfolder of the folder, we want it to be able to also show its content
function update_subfolder_clicks() {
      // Elements
      var subfolders_divs = document.getElementsByClassName("subfolderDiv");


      // Functions
      for (var folder_div of subfolders_divs){
            folder_div.addEventListener('click', async (e) => {
                  await subfolder_updater(e.currentTarget,false);
            });
      }
}

function update_subfolder_goback_clicks() {
      // Elements
      var subfolders_div = document.getElementsByClassName("subfolderDiv-back")[0];
      subfolders_div.addEventListener('click', async (e) => {
            subfolder_view_path.pop()
            current_viewed_folder = subfolder_view_path.at(-1)
            await current_subfolder_to_files_and_folders(subfolder_view_path.at(-1));
      });
}