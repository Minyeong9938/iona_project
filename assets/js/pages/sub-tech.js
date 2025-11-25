export default function initTechPage() {
    // device section
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });



    // tech-about section
    gsap.registerPlugin(ScrollTrigger);

    const ani = gsap.timeline();

    const delay = "+=3";
    const moveDist = 300;

    const animDuration = 2;
    const animEase = "power2.inOut";

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
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true
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
        }, delay)
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
        }, "+=3")
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
        }, "+=3");

    ScrollTrigger.create({
        animation: aniResearch,
        trigger: "#research-about",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true
    });
}