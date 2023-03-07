/* 
    The engine for the webpage
    Here, things which need to be called when the script starts are called here
    (Like Event handlers, variables loaders)
*/

// Startup scripts

//// Handling the input
DashboardInput.handle_input()

//// Handling the modal
RenameItems.handle_modal()

Structure_Modals_Handler.load_modals()


// Loading all the options classes
options_loader()