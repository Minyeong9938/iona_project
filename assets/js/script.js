// tech section
document.addEventListener("DOMContentLoaded", () => {

    const techSec = document.querySelector(".tech-sec");
    const cursor = document.querySelector(".cursor");

    // 마우스 위치 추척========================
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    let isDragging = false;
    let techActive = false;

    document.addEventListener("pointermove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // tech-sec 진입/이탈 시 커서 표시 제어
    techSec.addEventListener("mouseenter", () => {
        techActive = true;
        cursor.style.opacity = "1";
        document.body.style.cursor = "none";
        currentX = mouseX;
        currentY = mouseY;
    });

    techSec.addEventListener("mouseleave", () => {
        techActive = false;
        cursor.style.opacity = "0";
        document.body.style.cursor = "default";
        isDragging = false;
        cursor.textContent = "Drag";
    });

    // swiper 첫/마지막 슬라이드 여백
    function updateSwiperOffsets() {
        const container = document.querySelector('.container');
        const swiperEl = document.querySelector('.mySwiper');

        if (!container || !swiperEl) return;

        const containerWidth = container.offsetWidth; // 1484px
        const windowWidth = window.innerWidth;
        const containerPaddingLeft = parseFloat(getComputedStyle(container).paddingLeft);

        // 화면 넓이가 max-width보다 클 때, 컨테이너가 중앙 정렬되는 만큼 보정
        const extraSpace = (windowWidth - containerWidth) / 2;

        // offset = container padding + 중앙정렬 보정
        const offset = containerPaddingLeft + extraSpace;

        if (swiperEl.swiper) {
            swiperEl.swiper.params.slidesOffsetBefore = offset;
            swiperEl.swiper.params.slidesOffsetAfter = offset;
            swiperEl.swiper.update(); // 업데이트
        }
    }

    // swiper 슬라이더
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        spaceBetween: 60,
        watchOverflow: true,
        centeredSlides: false,
        allowTouchMove: true,
    });

    updateSwiperOffsets();
    window.addEventListener('resize', updateSwiperOffsets);

    // 커서 모양
    const swiperEl = swiper.el;
    swiperEl.addEventListener("pointerdown", () => {
        isDragging = true;
        cursor.innerHTML = '<i class="fa-solid fa-angle-left"></i>' + '<i class="fa-solid fa-chevron-right"></i>';
    });

    swiperEl.addEventListener("pointerup", () => {
        isDragging = false;
        cursor.innerHTML = '<i class="fa-solid fa-angle-left"></i>' + "Drag" + '<i class="fa-solid fa-chevron-right"></i>';
    });

    swiperEl.addEventListener("pointerleave", () => {
        isDragging = false;
        cursor.innerHTML = '<i class="fa-solid fa-angle-left"></i>' + "Drag" + '<i class="fa-solid fa-chevron-right"></i>';
    });

    // 커서 애니메이션
    function animateCursor() {
        if (!techActive) {
            // tech-section 밖이면 애니메이션 건너뛰기
            requestAnimationFrame(animateCursor);
            return;
        }
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        const scale = isDragging ? 0.8 : 1;
        cursor.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // GSAP 등장 애니메이션
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".tech-sec .swiper", {
        scrollTrigger: { trigger: ".tech-sec", start: "top 70%" },
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    });
});


// global
// video
const video = document.getElementById("bgVideo");
video.playbackRate = 0.75;

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    let hasRun = false; // 한 번만 실행되게

    const runCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let current = 0;
            const duration = 2000; // 총 지속시간 (ms)
            const stepTime = 10; // 숫자 증가 간격
            const increment = target / (duration / stepTime);

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    setTimeout(update, stepTime);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            update();
        });
    };

    // 화면에 들어올 때 실행
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                hasRun = true;
                runCounter();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector(".global-stats"));
});
