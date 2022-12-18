// Events
document.addEventListener("scroll", (event) => {
    control_homepage_opacity()
    control_about_opacity()
})


// https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

// Function that makes the homepage image slowly disappear as you scroll down, as it's a cool effect
var home_page_image = document.getElementById('homepage-design')
var home_page_lower_dashboard = document.getElementById("homepage-text-button")
function control_homepage_opacity() {
    var scroll_length = getScrollPercent();
    // From 40 to 65 percent scroll_length, we reduce the opacity
    // Opacity is from 0 to 1, where 0 is invisible, and 1 is full opacity
    var new_opacity = scale_linearly(
        scroll_length,
        40,
        65,
        1,
        0
    )
    home_page_image.style.opacity = new_opacity
    home_page_lower_dashboard.style.opacity = new_opacity
}

var about_page = document.getElementById('about')
function control_about_opacity() {
    var scroll_length = getScrollPercent();
    // From 50 to 75 percent scroll_length, we increase the opacity
    // Opacity is from 0 to 1, where 0 is invisible, and 1 is full opacity
    var new_opacity = scale_linearly(
        scroll_length,
        50,
        70,
        0,
        1
    )
    about_page.style.opacity = new_opacity
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


// redirect_to_links can be called, if you want to redirect the user to another website
urls = {
    "Tejas_Youtube" : "https://youtube.com/@TejasIsAmazing",
    "Dashboard": "/dashboard.html"
}
function redirect_to_links(which) {
    url_redirect = urls[which]
    window.open(url_redirect, '_blank').focus()
}


// TODO
// This function (tries to) tick every 50 ms .
function tick() {
    
}
