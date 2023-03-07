class TimePeriod extends Options {
    constructor() {
        super()

        /** @type {String}*/
        this.name="TimePeriod"

        /** 
         * This tells us the length of time a particular folder will accept, by default, 1 month
         * @type {Number}
         */
        this.time_period = 1


        /**
         * Stores and allows getting input for the option
         * @type {HTMLDivElement}
         */
        this.option_box = document.createElement('div')
    }
    
    /**
     * @param {FileSystemFileHandle[]} files_list
     */
    sort(files_list) {
        // TODO:
        for (let file of files_list) {
        }
    }
    
    /**
     * Generates html box that is used to input info for the option in the modal 
     */
    generate_html() {
        // TODO:

    }
}