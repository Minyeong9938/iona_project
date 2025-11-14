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

        const containerWidth = container.offsetWidth;
        const windowWidth = window.innerWidth;
        const containerPaddingLeft = parseFloat(getComputedStyle(container).paddingLeft);

        const extraSpace = (windowWidth - containerWidth) / 2;

        const offset = containerPaddingLeft + extraSpace;

        if (swiperEl.swiper) {
            swiperEl.swiper.params.slidesOffsetBefore = offset;
            swiperEl.swiper.params.slidesOffsetAfter = offset;
            swiperEl.swiper.update();
        }
    }

    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // swiper 슬라이더와 GSAP 애니메이션 통합
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        spaceBetween: 60,
        watchOverflow: true,
        centeredSlides: false,
        allowTouchMove: true,

        on: {
            init: function () {
                const slides = gsap.utils.toArray(this.slides);
                if (slides.length === 0) return;

                // ⭐ [핵심 수정] 렌더링 안정화를 위해 초기화 로직을 50ms 지연시킵니다.
                setTimeout(() => {

                    const firstSlideX = slides[0].getBoundingClientRect().left;

                    // 1. 스크롤 진입 전 카드를 즉시 '겹쳐진 상태'로 대기시킵니다.
                    gsap.set(slides, {
                        x: (i, target) => {
                            const currentX = target.getBoundingClientRect().left;
                            return firstSlideX - currentX;
                        },
                        opacity: 0,
                        scale: 0.9
                    });

                    // 2. 스크롤 진입 시 '동시에' 펼쳐지는 애니메이션 실행 (부드러움 복원)
                    gsap.to(slides, {
                        scrollTrigger: {
                            trigger: ".tech-sec",
                            start: "top 75%",
                            once: true
                        },

                        x: 0,
                        opacity: 1,
                        scale: 1,

                        // ⭐ 급발진 및 주춤거림 해결: duration, ease 재조정
                        duration: 0.9, // 부드러운 느낌을 위해 0.9초로 복원
                        ease: "power2.out", // 깔끔하고 부드러운 아웃 효과 적용

                        // stagger 속성은 제거되어 카드가 동시에 펼쳐집니다.

                        // 애니메이션 완료 후 Swiper의 원래 위치로 돌아가도록 강제합니다.
                        onComplete: function () {
                            gsap.set(slides, { clearProps: "transform,opacity,scale" });
                        }
                    });
                }, 50); // 50ms 지연
            }
        }
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
});

//============================================

// global section
// video
const video = document.getElementById("bgVideo");
video.playbackRate = 0.75;

// count
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    let hasRun = false;

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

//============================================

// banner section
document.addEventListener('DOMContentLoaded', () => {
    // 1. 관찰 대상 요소 설정
    const bannerSec = document.querySelector('.banner-sec');

    // 2. Intersection Observer 콜백 함수 정의
    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target.querySelector('h2');
                const p = entry.target.querySelector('p');

                if (h2) h2.classList.add('animated');
                if (p) p.classList.add('animated');

                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // 뷰포트 기준
        // ⭐ 수정된 부분: threshold를 0.6으로 변경 (섹션이 60% 이상 보여야 실행)
        threshold: 0.4
    });

    // 3. 관찰 시작
    if (bannerSec) {
        textObserver.observe(bannerSec);
    }
});