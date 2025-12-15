// about section
gsap.registerPlugin(ScrollTrigger);


gsap.to(".text01", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".text01",
        start: "center 40%",
        end: "60% 20%",
        scrub: true,
    }
});

// 🖼️ img01: text01과 함께 사라짐
gsap.to(".img01", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".text01",
        start: "top -10%",
        end: "bottom 20%",
        scrub: 1,
        // markers: true
    }
});



// 나타나기
gsap.fromTo(".text02",
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".text02",
            start: "40% 80%",
            end: "center 50%",
            scrub: true,
        }
    }
);

// 사라지기
gsap.fromTo(".text02",
    { opacity: 1 },
    {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
            trigger: ".text02",
            start: "center 40%",
            end: "60% 20%",
            scrub: true,
        }
    }
);


gsap.to(".img02", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".text02",
        start: "top -10%",
        end: "bottom 20%",
        scrub: 1,
    }
});



// 나타나기
gsap.fromTo(".text03",
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".text03",
            start: "40% 80%",
            end: "center 50%",
            scrub: true,
        }
    }
);

// 사라지기
gsap.fromTo(".text03",
    { opacity: 1 },
    {
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
            trigger: ".text03",
            start: "center 40%",
            end: "60% 20%",
            scrub: true,
        }
    }
);


gsap.to(".img03", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".text03",
        start: "top -10%",
        end: "bottom 20%",
        scrub: 1,
    }
});



gsap.fromTo(".text04",
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".text04",
            start: "40% 80%",
            end: "center 60%",
            scrub: true,
            // markers: true
        }
    }
);

// mobile js
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.3,
    spaceBetween: 24,
});