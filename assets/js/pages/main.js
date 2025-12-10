// --- main.js 파일에 추가할 코드 ---

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const kvSec = document.querySelector('.kv-sec');

    // 메인 페이지가 아니거나 kvSec이 없으면 스크롤 로직 실행 안 함
    if (!header || !kvSec || !header.classList.contains('main-header')) return;

    function handleHeaderScroll() {
        // 모바일 메뉴가 열렸을 때는 스크롤 로직을 무시하고 CSS에 배경색 처리를 맡깁니다.
        if (body.classList.contains('menu-open')) {
            return; // 메뉴가 열리면 스크롤 클래스 토글을 멈춤
        }

        const kvBottom = kvSec.offsetTop + kvSec.offsetHeight;

        if (window.scrollY > kvBottom) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 초기 로드 시 및 스크롤 시 실행
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll);

    // 햄버거 버튼 클릭 시 handleHeaderScroll을 다시 실행하여 상태 업데이트
    btn.addEventListener('click', handleHeaderScroll);
});

const kvSwiper = new Swiper('.kv-swiper', {
    loop: true,
    // autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    // },
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 800,

    pagination: {
        el: '.kv-pagination',
        clickable: true,
    },
});

// tech section
const techSec = document.querySelector(".tech-sec");
const cursor = document.querySelector(".cursor");

// tech section이 존재할 때만 실행
if (techSec && cursor) {

    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    let isDragging = false;
    let techActive = false;

    document.addEventListener("pointermove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

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

    gsap.registerPlugin(ScrollTrigger);

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

                setTimeout(() => {
                    const firstSlideX = slides[0].getBoundingClientRect().left;

                    gsap.set(slides, {
                        x: (i, target) => {
                            const currentX = target.getBoundingClientRect().left;
                            return firstSlideX - currentX;
                        },
                        opacity: 0,
                        scale: 0.9
                    });

                    gsap.to(slides, {
                        scrollTrigger: {
                            trigger: ".tech-sec",
                            start: "top 75%",
                            once: true
                        },
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        onComplete: function () {
                            gsap.set(slides, { clearProps: "transform,opacity,scale" });
                        }
                    });
                }, 50);
            }
        }
    });

    updateSwiperOffsets();
    window.addEventListener('resize', updateSwiperOffsets);

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
}

// global section (video + counter)
const video = document.getElementById("bgVideo");
if (video) video.playbackRate = 0.75;

const counters = document.querySelectorAll(".count");
if (counters.length > 0) {

    let hasRun = false;

    const runCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let current = 0;
            const duration = 2000;
            const stepTime = 10;
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

    const stats = document.querySelector(".global-stats");

    if (stats) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasRun) {
                    hasRun = true;
                    runCounter();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(stats);
    }
}

// banner section
const bannerSec = document.querySelector('.banner-sec');
if (bannerSec) {

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
        threshold: 0.4
    });

    textObserver.observe(bannerSec);
}
