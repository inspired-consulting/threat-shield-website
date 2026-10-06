// Desktop navbar: hide while scrolling down, show while scrolling up.
// Visibility and click-through are handled by the .fade-in / .fade-out CSS classes.
// Pages without a #navbar (legal pages, documentation) load this file too, so guard for null.

var navbar = document.getElementById('navbar');

if (navbar && window.innerWidth > 1023) {
    var oldScroll = window.scrollY;

    window.addEventListener('scroll', function () {
        if (window.scrollY < oldScroll) {
            navbar.classList.remove('fade-out');
            navbar.classList.add('fade-in');
        } else if (window.scrollY > oldScroll) {
            navbar.classList.remove('fade-in');
            navbar.classList.add('fade-out');
        }
        oldScroll = window.scrollY;
    });
}
