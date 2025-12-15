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

let techAboutContents = document.querySelectorAll('#tech-about .tech-about-content');

techAboutContents.forEach((el, index) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
        }
    });

    tl.to(el, {
        opacity: 0,
        y: -100,
    })
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
        scrub: 3, // 스크롤에 따라 부드럽게 애니메이션
        // end: "+=4000", // 스크롤 길이 설정 (4000px 동안 애니메이션 진행)
        end: () => `+=${numItems * 1000}`, // 슬라이드 개수에 비례하여 스크롤 길이 설정 (선택 사항)
        // markers: true // 디버깅용 마커 (필요 없으면 주석 처리)
    }
});

// research section
let researchContents = document.querySelectorAll('#research-about .research-content');

researchContents.forEach((el, index) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
        }
    });

    tl.to(el, {
        opacity: 0,
        y: -100,
    })
});