// Function that makes the homepage image slowly disappear as you scroll down, as its a cool effect
var home_page_image = document.getElementById('homepage-design')
var home_page_lower_dashboard = document.getElementById("homepage-text-button")
function make_disappear() {
    var scroll_length = window.scrollY;
    // From 400 to 600 scroll_length, we reduce the opacity
    if (scroll_length > 10) {
        // Opacity s from 0 to 1, where 0 is invisible, and 1 is full opacity
        var new_opacity = scale_linearly(
            scroll_length,
            400,
            750,
            1,
            0
        )
        home_page_image.style.opacity = new_opacity
        home_page_lower_dashboard.style.opacity = new_opacity

    }
}


// This functions scales a number within the new_min and new_max values, linearly
function scale_linearly(old_value, old_min, old_max, new_min, new_max) {
    // Checking for extreme cases
    if (old_value > old_max) {
        return new_max
    } else if (old_value < old_min) {
        return new_min
    }

    // https://stats.stackexchange.com/questions/281162/scale-a-number-between-a-range
    new_value = (((old_value - old_min) / (old_max - old_min)) * (new_max - new_min)) + new_min
    return new_value
}


// TODO
// This function (tries to) tick every 50 ms .
function tick() {
    
}

document.addEventListener("scroll", (event) => {
    make_disappear()
})