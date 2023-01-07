class ObjInfo {
    // Elements
    static modal = document.getElementById("info-modal");
    static modal_close = document.getElementById("close-info-modal");

    // Functions :

    // Handle the modal that displays the information.
    static async handle_modal() {
        ObjInfo.modal_close.onclick = function () {
            ObjInfo.modal.style.display = "none";
        };
        
        window.onclick = function (event) {
            if (event.target == ObjInfo.modal) {
                ObjInfo.modal.style.display = "none";
            }
        };
    }


    static async show(el) {
        this.handle_modal();
        
        const obj_name = el.name;
        const obj_kind = el.dataset.kind;
        const original = el.dataset.og;

        // Show the modal :
        ObjInfo.modal.style.display = "block";
    }
}