class DeleteItems {
    // Elements
    static delete_btn = document.getElementsByClassName("delete_btn");

    // Functions
    static async delete_obj(el) {
        const obj_name = el.name;
        const obj_kind = el.kind;
        
        console.log(obj_name, obj_kind);
    }
}