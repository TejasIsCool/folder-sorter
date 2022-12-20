/*
const sorting_method_dropdown = document.getElementById('format')

 Very temporary
 NEED TO ENABLE "Experimental Web Platform features"
const sort_button = document.getElementById('sort-button')
sort_button.addEventListener('click', async () => {
    if (directory_handles != undefined){
        if (!confirm("DO you want to do this?")){
            return
        }
        var sorting_method = sorting_method_dropdown.value
        if (sorting_method == "filetype") {
            filetypes = {}
            for (file of all_files[file]) {
                file_type = file.name.split('.').at(-1)
                // If the file type already doesent exist as a key in the dict, make it
                if (!(file_type in filetypes)) {
                    filetypes[file_type] = []
                }
                filetypes[file_type].push(file)
            }
            console.log(filetypes)

            // Object.keys gets all the keys of the dict as an array
            for (file_type of Object.keys(filetypes)) {
                console.log(file_type)
                // Creates a folder with the same name as the key (which is the file type)
                folder = await directory_handles.getDirectoryHandle(file_type,{create:true})
                for (file of filetypes[file_type]){
                    console.log(file)
                    // Moving all the files with the filetype into the just created folder
                    await file.move(folder)
                }
            }
        } else if (sorting_method == "name") {
            let obj = {};
            let counter = 0;
            let folder_name = [];
            let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

            while ((counter <= 24)) {
                if (counter % 8 == 0 && counter != 0) {
                    folder_name.push(letters[counter])
                    obj[`folder${folder_name[0]}${folder_name[1]}${folder_name[2]}`] = await directory_handles.getDirectoryHandle(`${folder_name[0]}-${folder_name[7]}`,{create:true});
                    folder_name = []
                }

                folder_name.push(letters[counter])
                counter++;
            }

            obj["folderYZ"] = await directory_handles.getDirectoryHandle("Y-Z", {create:true});
            
            for (file of all_files["file"]) {
                let index_of_letter_list = letters.indexOf(file.name.charAt(0));

                if (index_of_letter_list < 8) {
                    file.move(obj["folderABC"]);
                } else if (index_of_letter_list > 7 && index_of_letter_list < 16) {
                    file.move(obj["folderIJK"]);
                } else if (index_of_letter_list > 15 && index_of_letter_list < 24) {
                    file.move(obj["folderQRS"]);
                } else {
                    file.move(obj["folderYZ"]);
                }
            }
            
        }
    }
})*/