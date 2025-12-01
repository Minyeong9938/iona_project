// 햄버거
let btn = document.querySelector(".hamburger-btn");
let menu = document.querySelector(".header-nav");

const body = document.body;
let menuLinks = document.querySelectorAll(".header-menu li a");
let btnIcon = btn.querySelector('i');

function toggleMenu() {
    menu.classList.toggle("on");
    body.classList.toggle("menu-open");

    if (menu.classList.contains("on")) {
        btnIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        btnIcon.classList.replace("fa-xmark", "fa-bars");
    }
}

btn.addEventListener('click', toggleMenu);

menuLinks.forEach(function (link) {
    link.addEventListener('click', toggleMenu);
});