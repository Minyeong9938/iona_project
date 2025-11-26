export default function initBrandValuePage() {
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
        const img = card.querySelector('img');

        if (img) {
            const originalSrc = img.getAttribute('src');

            const hoverSrc = originalSrc.replace('_black.png', '_white.png');

            card.addEventListener('mouseenter', () => {
                if (hoverSrc !== originalSrc) {
                    img.src = hoverSrc;
                }
            });

            card.addEventListener('mouseleave', () => {
                img.src = originalSrc;
            });
        }
    });
}