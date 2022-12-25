// Elements
const modal_close = document.getElementById("close-rename-modal");
const modal = document.getElementById("rename-modal");
const modal_field = document.getElementById("rename-modal-field");
const submit_btn = document.getElementById("rename-btn");

// Functions
modal_close.onclick = function() {
    modal.style.display = "none";
  }
  
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

async function modal_input(divName) {
    modal.style.display = "block";
    modal_field.value = divName;
}

async function rename_item(divName) {
    var current_name = divName.innerHTML;

    // Input the original name into input field.
    await modal_input(current_name);
    
    // Check if object is a file or a directory/folder.
    if (divName.classList.contains("folder")) {
      var obj_type = "directory";
    } else if (divName.classList.contains("file")) {
      var obj_type = "file";
    }

    if (divName.classList.contains("og")) {
      var og_or_sub = true;
    } else {
      var og_or_sub = false;
    }
    
}


submit_btn.addEventListener("click", async () => {

      //submit_btn.disabled = true
      // Exit the modal
      modal.style.display = "none";

      // Get new name
      var new_name = modal_field.value;

      
      console.log("HUH")
      //await get_directory_handler(current_name, new_name, og_or_sub, obj_type);
})


async function get_directory_handler(old_name, new_name, og_or_sub, type) {
  // Check if the clicked file/folder the main folder or apart of a subfolder: true = main, false = sub
  if (og_or_sub == true) {
    for await (thing of directory_handles.values()) {
      console.log(thing)
      if (thing.kind == type && thing.name == old_name) {
        console.log("found");
        await thing.move(new_name);
      }
    }
  }
  // Else we navigate to the current folder we are on
  update_all_files()
  update_view()
}
