export default function initVisionPage() {
    // 뷰포트에 고정되어 활성 상태를 변경할 모든 .year-pin 요소를 선택합니다.
    const pinElements = document.querySelectorAll('.year-pin');

    // =========================================================================
    // Intersection Observer 설정 (Sticky Pin Highlighting Logic)
    // =========================================================================
    const observerOptions = {
        // 헤더의 높이(80px)를 고려하여 Intersection Observer의 기준점을 뷰포트 상단 80px 지점으로 설정합니다.
        // 이렇게 하면 pin이 CSS의 'top: 80px'에 의해 고정되는 시점에 정확히 Active 클래스가 부여됩니다.
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0 // 요소가 1px이라도 뷰포트 경계(-80px)에 도달하면 감지
    };

    /**
     * 활성 핀을 설정하고 나머지 핀을 비활성화하는 함수
     * @param {HTMLElement} targetPin - 활성화할 pin DOM 요소
     */
    function setActivePin(targetPin) {
        // 모든 핀에서 기존 active 클래스 제거
        pinElements.forEach(pin => {
            pin.classList.remove('active');
        });
        // 현재 타겟 핀에만 active 클래스 추가
        targetPin.classList.add('active');
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetPin = entry.target;

            // 요소가 뷰포트의 타겟 지점(상단 80px)에 진입했을 때 활성화합니다.
            if (entry.isIntersecting) {
                // 이 조건은 스크롤 다운하여 핀이 고정(Sticky) 상태가 되는 시점을 포착합니다.
                if (entry.boundingClientRect.top <= 80) {
                    setActivePin(targetPin);
                }
            }
            // 스크롤 업하여 핀이 뷰포트 상단을 벗어날 때의 처리는 일반적으로
            // 다음 (아래쪽) 핀이 활성화될 때까지 현재 상태를 유지하므로 추가 로직이 필요 없습니다.
        });
    }, observerOptions);

    // 모든 년도 핀에 대해 관찰 시작
    pinElements.forEach(pin => {
        intersectionObserver.observe(pin);
    });

    // 페이지 로드 시 첫 번째 항목 활성화
    if (pinElements.length > 0) {
        // Intersection Observer가 첫 번째 핀을 활성화하기 전에 미리 활성화 상태를 지정합니다.
        setActivePin(pinElements[0]);
    }
}