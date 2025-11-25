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

    const ani7 = gsap.timeline();

    const delay = "+=3";
    const moveDist = 200;

    const animDuration = 2;
    const animEase = "power2.inOut";

    ani7.from(".tech-about .t1", {
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

        .to("#tech-about .t2", { autoAlpha: 0, duration: animDuration, y: -moveDist, ease: animEase }, delay);

    ScrollTrigger.create({
        animation: ani7,
        trigger: "#tech-about",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true
    });
}