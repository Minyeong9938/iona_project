document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    // AOS 전역 초기화
    AOS.init({ once: true });

    // 페이지 라우팅
    switch (page) {

        case "main":
            import('./pages/main.js').then(module => module.default());
            break;

        // case "about":
        //     import('./pages/sub-about.js').then(module => module.default());
        //     break;

        // case "tech":
        //     import('./pages/sub-tech.js').then(module => module.default());
        //     break;

        // case "product":
        //     import('./pages/sub-product.js').then(module => module.default());
        //     break;

        // default:
        //     // 아무 페이지도 해당 안 될 때
        //     break;
    }
});
