
const selected_folder_text = document.getElementById('folder-title')
const file_stats = document.getElementById('file-stat')
const file_count_text = document.getElementById('file-stat').getElementsByTagName('h1')[0]
const folder_count_text = document.getElementById('folder-stat').getElementsByTagName('h1')[0]
function update_text() {
    selected_folder_text.textContent = directory_handles.name
    file_count_text.textContent = all_files['file'].length
    folder_count_text.textContent = all_files['directory'].length
}

const files_and_folders_list = document.getElementById('files-and-folders-list')
function update_files_and_folders_list() {
    
}

function update_view() {
    update_text()
}