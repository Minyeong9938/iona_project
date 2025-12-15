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
gsap.matchMedia().add("(min-width: 1025px)", () => {
    // 1025px 이상일 때만 가로 스크롤 애니메이션 실행
    let horizontalItems = gsap.utils.toArray('.device-tech-sec .device-bg');

    // 슬라이드 개수
    const numItems = horizontalItems.length;

    gsap.to(horizontalItems, {
        xPercent: -100 * (numItems - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.device-tech-sec',
            pin: true, // 섹션을 화면에 고정
            scrub: 1.5, // 스크롤에 따라 부드럽게 애니메이션
            end: () => `+=${numItems * 1000}`,
        }
    });

    // MatchMedia 블록이 끝날 때 애니메이션을 정리할 수 있도록 return
    return () => {
        // 클린업 로직 (필요시)
        ScrollTrigger.getById('device-tech-scroll').kill();
    };
});

// research section
let researchContents = document.querySelectorAll('#research-about .research-content');

researchContents.forEach((el, index) => {
    if (index === researchContents.length - 1) {
        // 마지막 항목: 처음엔 opacity 0, 중앙에서 1로, 이후 1 유지
        gsap.set(el, { opacity: 0 }); // 초기값 0으로 설정

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '30% 80%',
                end: 'center center',
                scrub: 1.5,
                // markers: true,
            }
        });

        // top center에서 bottom center까지 0 → 1로 변함
        // 이후는 자동으로 1로 유지됨
        tl.to(el, {
            opacity: 1,
        });
    } else {
        // 다른 항목들: 기존 애니메이션
        // let tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: el,
        //         start: '30% center',
        //         end: '70% center',
        //         scrub: 1.5,
        //         markers: true,
        //     }
        // });

        // tl.to(el, {
        //     opacity: 0,
        //     // y: -100,
        // });
        gsap.fromTo(el,
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: el,
                    markers: true,
                    start: '30% 80%',
                    end: 'center center',
                    scrub: 1.5,
                }
            });

        // 세번째 영역이 사라질 때
        gsap.fromTo(el,
            { opacity: 1 },
            {
                opacity: 0,
                imgmediateRender: false,
                // 충돌 방지. 스크롤 해서 해당 구간에 도착할 때까지 기다림
                scrollTrigger: {
                    trigger: el,
                    // markers: true,
                    start: 'center 40%',
                    end: '70% 30%',
                    scrub: 1.5,
                }
            });
    }
});