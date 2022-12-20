// Testing code
const input_button = document.getElementById('select-folder-btn');
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
