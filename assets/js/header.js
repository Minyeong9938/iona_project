function highlightCurrentPage() {
    // 현재 페이지의 경로 (예: /about.html, /tech.html)
    const currentPath = window.location.pathname.split('/').pop();

    // 헤더 메뉴의 모든 링크 요소를 가져옵니다.
    const menuLinks = document.querySelectorAll(".header-menu li a");

    menuLinks.forEach(link => {
        // 각 링크의 href 속성에서 파일 이름만 추출 (예: about.html)
        const linkPath = link.getAttribute('href').split('/').pop();

        // 현재 페이지 경로와 링크 경로가 일치하면 'active' 클래스 추가
        // 'index.html' 또는 아무것도 없을 때는 'index.html'에 active를 줍니다.
        if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
}

// 페이지 로드 시 함수 실행
document.addEventListener('DOMContentLoaded', highlightCurrentPage);


// 햄버거
let btn = document.querySelector(".hamburger-btn");
let menu = document.querySelector(".header-nav");

const body = document.body;
let menuLinks = document.querySelectorAll(".header-menu li a");
let btnIcon = btn.querySelector('i');

function toggleMenu() {
    menu.classList.toggle("on"); // 이 클래스가 CSS 애니메이션을 트리거합니다.
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