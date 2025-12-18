// device section
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.6,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3.5,
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
    if (index === techAboutContents.length - 1) {
        gsap.set(el, { opacity: 0 });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '30% 80%',
                end: 'center center',
                scrub: 1.5,
                // markers: true,
            }
        });

        tl.to(el, {
            opacity: 1,
        });
    } else {
        gsap.fromTo(el,
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: el,
                    start: '30% 80%',
                    end: 'center center',
                    scrub: 1.5,
                }
            });

        gsap.fromTo(el,
            { opacity: 1 },
            {
                opacity: 0,
                imgmediateRender: false,
                scrollTrigger: {
                    trigger: el,
                    start: 'center 40%',
                    end: '70% 30%',
                    scrub: 1.5,
                }
            });
    }
});



// device-tech section
gsap.matchMedia().add("(min-width: 1025px)", () => {
    let horizontalItems = gsap.utils.toArray('.device-tech-sec .device-bg');

    const numItems = horizontalItems.length;

    gsap.to(horizontalItems, {
        xPercent: -100 * (numItems - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.device-tech-sec',
            pin: true,
            scrub: 1.5,
            end: () => `+=${numItems * 1000}`,
        }
    });

    return () => {
        ScrollTrigger.getById('device-tech-scroll').kill();
    };
});



// research section
let researchContents = document.querySelectorAll('#research-about .research-content');

researchContents.forEach((el, index) => {
    if (index === researchContents.length - 1) {
        gsap.set(el, { opacity: 0 });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '30% 80%',
                end: 'center center',
                scrub: 1.5,
                // markers: true,
            }
        });

        tl.to(el, {
            opacity: 1,
        });
    } else {
        gsap.fromTo(el,
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: el,
                    start: '30% 80%',
                    end: 'center center',
                    scrub: 1.5,
                }
            });

        gsap.fromTo(el,
            { opacity: 1 },
            {
                opacity: 0,
                imgmediateRender: false,
                scrollTrigger: {
                    trigger: el,
                    start: 'center 40%',
                    end: '70% 30%',
                    scrub: 1.5,
                }
            });
    }
});