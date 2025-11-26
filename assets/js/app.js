document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    // AOS 전역 초기화
    AOS.init({ once: true });

    // 페이지 라우팅
    switch (page) {

        case "main":
            import('./pages/main.js').then(module => module.default());
            break;

        case "about":
            import('./pages/sub-about.js').then(m => m.default());
            break;

        case "tech":
            import('./pages/sub-tech.js').then(module => module.default());
            break;

        case "value":
            import('./pages/sub-brand-value.js').then(module => module.default());
            break;

        case "vision":
            import('./pages/sub-vision.js').then(module => module.default());
            break;

        case "contact":
            import('./pages/sub-contact.js').then(module => module.default());
            break;

        default:
            // 아무 페이지도 해당 안 될 때
            break;
    }
});
