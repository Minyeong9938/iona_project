document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth >= 769) {

        console.log("PC 버전 스크립트 실행됨!");  // 테스트용

        // 이미지 컬러
        const valueCards = document.querySelectorAll('.growth-box');

        valueCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace('_primary.png', '_white.png');

                card.addEventListener('mouseenter', () => img.src = hoverSrc);
                card.addEventListener('mouseleave', () => img.src = originalSrc);
            }
        });

        // 스크롤 핀
        const pinElements = document.querySelectorAll('.year-pin');

        const observerOptions = {
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0
        };

        function setActivePin(targetPin) {
            pinElements.forEach(pin => pin.classList.remove('active'));
            targetPin.classList.add('active');
        }

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.boundingClientRect.top <= 80) {
                    setActivePin(entry.target);
                }
            });
        }, observerOptions);

        pinElements.forEach(pin => intersectionObserver.observe(pin));
        if (pinElements.length > 0) setActivePin(pinElements[0]);
    }
});
