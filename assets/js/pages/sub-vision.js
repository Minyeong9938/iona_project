document.addEventListener("DOMContentLoaded", function () {

    const valueCards = document.querySelectorAll('.growth-box');
    const pinElements = document.querySelectorAll('.year-pin');

    let hoverEnabled = false;

    // hover 이벤트
    function addHoverEvents() {
        valueCards.forEach(card => {
            const img = card.querySelector('img');
            if (!img) return;

            const originalSrc = img.getAttribute('src');
            const hoverSrc = originalSrc.replace('_primary.png', '_white.png');

            card._enterEvent = () => img.src = hoverSrc;
            card._leaveEvent = () => img.src = originalSrc;

            card.addEventListener('mouseenter', card._enterEvent);
            card.addEventListener('mouseleave', card._leaveEvent);
        });
    }

    // hover 이벤트 제거
    function removeHoverEvents() {
        valueCards.forEach(card => {
            if (card._enterEvent) {
                card.removeEventListener('mouseenter', card._enterEvent);
                card.removeEventListener('mouseleave', card._leaveEvent);
            }
        });
    }

    // IntersectionObserver 생성
    const observerOptions = {
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0
    };

    function setActivePin(targetPin) {
        pinElements.forEach(pin => pin.classList.remove('active'));
        targetPin.classList.add('active');
    }

    let intersectionObserver = null;

    function enablePinObserver() {
        if (intersectionObserver) return;

        intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.boundingClientRect.top <= 80) {
                    setActivePin(entry.target);
                }
            });
        }, observerOptions);

        pinElements.forEach(pin => intersectionObserver.observe(pin));
        if (pinElements.length > 0) setActivePin(pinElements[0]);
    }

    function disablePinObserver() {
        if (!intersectionObserver) return;

        pinElements.forEach(pin => intersectionObserver.unobserve(pin));
        intersectionObserver.disconnect();
        intersectionObserver = null;
    }

    // 화면 크기에 따라 활성화/비활성화
    function updateScriptState() {
        if (window.innerWidth <= 767) {
            removeHoverEvents();
            disablePinObserver();
            hoverEnabled = false;
        } else {
            if (!hoverEnabled) {
                addHoverEvents();
                enablePinObserver();
                hoverEnabled = true;
            }
        }
    }

    updateScriptState();

    window.addEventListener('resize', updateScriptState);

});
