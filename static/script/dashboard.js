// Testing code
const input_button = document.getElementById('input-button');
var directory_handles = undefined
var all_files = {}
input_button.addEventListener('click', async () => {
    all_files = {}
    directory_handles = await window.showDirectoryPicker({mode:"readwrite"});
    for await (thing of directory_handles.values()){
        if (!(thing.kind in all_files)){
            all_files[thing.kind] = []
        }
        all_files[thing.kind].push(thing)
    }
    update_view();
});

const selected_folder_text = document.getElementById('Selected-File-Text')
const file_count_text = document.getElementById('File-Count-Text')
const folder_count_text = document.getElementById('Folder-Count-Text')
function update_view() {
    selected_folder_text.textContent = "Selected Folder: " + directory_handles.name
    file_count_text.textContent = "Files Found In Folder: " + all_files['file'].length
    folder_count_text.textContent = "Folders Found in Folder: " + all_files['directory'].length
}

const sorting_method_dropdown = document.getElementById('format')

// Very temporary
// NEED TO ENABLE "Experimental Web Platform features"
const sort_button = document.getElementById('sort-button')
sort_button.addEventListener('click', async () => {
    if (directory_handles != undefined){
        var sorting_method = sorting_method_dropdown.value
        if (sorting_method == "filetype") {
            filetypes = {}
            for (file of all_files.file) {
                file_type = file.name.split('.').at(-1)
                if (!(file_type in filetypes)) {
                    filetypes[file_type] = []
                }
                filetypes[file_type].push(file)
            }
            console.log(filetypes)

            for (file_type of Object.keys(filetypes)) {
                console.log(file_type)
                folder = await directory_handles.getDirectoryHandle(file_type,{create:true})
                for (file of filetypes[file_type]){
                    console.log(file)
                    await file.move(folder)
                }
            }
        }
    }
})
