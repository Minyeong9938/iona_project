export default function initBrandValuePage() {
    // 💥 value-card 호버 이미지 전환 섹션
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            // 원본 이미지 경로를 저장합니다. (예: .../icon01_black.png)
            const originalSrc = img.src;

            // 💥 호버 시 변경할 이미지 경로를 생성합니다.
            // _black.png를 _white.png로 변경합니다. (예: .../icon01_white.png)
            const hoverSrc = originalSrc.replace('_black.png', '_white.png');

            // 마우스 진입 시 (호버 시작)
            card.addEventListener('mouseenter', () => {
                // 새로운 이미지 경로가 원본과 다를 경우에만 src를 변경합니다.
                if (hoverSrc !== originalSrc) {
                    img.src = hoverSrc;
                }
            });

            // 마우스 이탈 시 (호버 종료)
            card.addEventListener('mouseleave', () => {
                // 원본 이미지 경로로 src를 복원합니다.
                img.src = originalSrc;
            });
        }
    });
    // 💥 value-card 호버 이미지 전환 섹션 끝
}