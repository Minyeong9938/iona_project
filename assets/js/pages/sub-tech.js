// device section
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },

        1200: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    },
});



// tech-about section
gsap.registerPlugin(ScrollTrigger);

const ani = gsap.timeline();

const delay = "+=3";
const moveDist = 250;

const animDuration = 2;
const animEase = "power1.inOut";

ani.from("#tech-about .t1", {
    autoAlpha: 0,
    duration: animDuration,
    y: moveDist,
    ease: animEase
}, "start")

    .to("#tech-about .t1", {
        autoAlpha: 0,
        duration: animDuration,
        y: -moveDist,
        ease: animEase
    }, delay)
    .from("#tech-about .t2", {
        autoAlpha: 0,
        duration: animDuration,
        y: moveDist,
        ease: animEase
    }, "<")

    .to("#tech-about .t2", { autoAlpha: 1, duration: animDuration, y: -moveDist, ease: animEase }, delay);

ScrollTrigger.create({
    animation: ani,
    trigger: "#tech-about",
    start: "top top",
    end: "+=3200",
    scrub: 0.3,
    pin: true,
    anticipatePin: 1,
    // markers: true
});

// device-tech section
let horizontalItems = gsap.utils.toArray('.device-tech-sec .device-bg');

// 슬라이드 개수
const numItems = horizontalItems.length;

// .horizontal-wrap 전체 너비를 (슬라이드 개수 * 100vw)로 설정했으므로, 
// 마지막 슬라이드가 뷰포트 끝에 올 때까지 스크롤 되도록 xPercent를 계산합니다.
gsap.to(horizontalItems, {
    xPercent: -100 * (numItems - 1), // 예: 4개일 경우 -300%
    ease: 'none',
    scrollTrigger: {
        trigger: '.device-tech-sec',
        pin: true, // 섹션을 화면에 고정
        scrub: 1, // 스크롤에 따라 부드럽게 애니메이션
        // end: "+=4000", // 스크롤 길이 설정 (4000px 동안 애니메이션 진행)
        end: () => `+=${numItems * 1000}`, // 슬라이드 개수에 비례하여 스크롤 길이 설정 (선택 사항)
        // markers: true // 디버깅용 마커 (필요 없으면 주석 처리)
    }
});

// research section
const aniResearch = gsap.timeline();

aniResearch.from("#research-about .r1", {
    autoAlpha: 0,
    duration: animDuration,
    y: moveDist,
    ease: animEase
}, "start")

    .to("#research-about .r1", {
        autoAlpha: 0,
        duration: animDuration,
        y: -moveDist,
        ease: animEase
    }, "+=3.5")
    .from("#research-about .r2", {
        autoAlpha: 0,
        duration: animDuration,
        y: moveDist,
        ease: animEase
    }, "< + 0.1")

    .to("#research-about .r2", {
        autoAlpha: 0,
        duration: animDuration,
        y: -moveDist,
        ease: animEase
    }, "+=3.5")
    .from("#research-about .r3", {
        autoAlpha: 0,
        duration: animDuration,
        y: moveDist,
        ease: animEase
    }, "< + 0.1")

    .to("#research-about .r3", {
        autoAlpha: 1,
        duration: animDuration,
        y: -moveDist,
        ease: animEase
    }, "+=3.5");

ScrollTrigger.create({
    animation: aniResearch,
    trigger: "#research-about",
    start: "top top",
    end: "+=5000",
    scrub: 0.2,
    pin: true,
    anticipatePin: 1,
    // markers: true
});