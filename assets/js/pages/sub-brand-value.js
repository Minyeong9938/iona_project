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



document.addEventListener("DOMContentLoaded", () => {
    const achieveBoxes = document.querySelectorAll(".achieve-box span");
    let hasRunAchieve = false;

    function runAchieveCounter() {
        achieveBoxes.forEach(span => {
            const text = span.textContent.trim();
            const numberMatch = text.match(/(\d+)/);

            if (!numberMatch) return;

            const target = parseInt(numberMatch[1]);
            const suffix = text.replace(numberMatch[1], ""); // "건", "%" 이런 것

            let current = 0;
            const duration = 2000;
            const stepTime = 10;
            const increment = target / (duration / stepTime);

            const update = () => {
                current += increment;
                if (current < target) {
                    span.textContent = Math.floor(current) + suffix;
                    setTimeout(update, stepTime);
                } else {
                    span.textContent = target + suffix;
                }
            };
            update();
        });
    }

    const achieveSection = document.querySelector(".achieve-sec");

    if (achieveSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasRunAchieve) {
                    hasRunAchieve = true;
                    runAchieveCounter();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(achieveSection);
    }
});
