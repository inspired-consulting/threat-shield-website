// Desktop navbar behaviour. Pages without a #navbar (legal pages, documentation)
// load this file too, so everything is guarded for a missing element.

var navbar = document.getElementById('navbar');
var oldScroll = window.scrollY;

if (navbar) {
    window.onscroll = function () { scrollFunction(); };

    if (window.innerWidth > 1023) {
        window.addEventListener('scroll', async function () {
            if (oldScroll > window.scrollY) {
                navbar.style.zIndex = 50;
                navbar.classList.remove('fade-out');
                navbar.classList.add('fade-in');
            } else {
                navbar.classList.remove('fade-in');
                navbar.classList.add('fade-out');
                await sleep(500);
                navbar.style.zIndex = -1;
            }
            oldScroll = window.scrollY;
        });
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-64px";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
