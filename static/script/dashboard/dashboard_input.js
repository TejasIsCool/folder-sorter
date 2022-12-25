const input_button = document.getElementById('select-folder-btn');
var directory_handles = undefined
var all_files = {
    "file": [],
    "directory": []
}
var current_viewed_folder = directory_handles
var subfolder_view_path = []
input_button.addEventListener('click', async () => {
    console.log("TESTINPUTBUTTONS")
    all_files = {
        "file": [],
        "directory": []
    }
    directory_handles = await window.showDirectoryPicker({mode:"readwrite"});
    await update_all_files()
    update_view();
});


async function update_all_files() {
    current_viewed_folder = directory_handles
    subfolder_view_path = [current_viewed_folder]
    for await (thing of directory_handles.values()){
        if (thing.kind == "file") {
            all_files[thing.kind].push(thing)
        } else if (thing.kind == "directory") {
            console.log(thing);
            all_files[thing.kind].push(thing)
        }
    }
    
    console.log(all_files)
}