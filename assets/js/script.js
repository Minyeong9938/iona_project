// about section
const productItems = document.querySelectorAll(".product-item");
const productImages = document.querySelectorAll(".product-image");

function updateActiveProduct() {
    const scrollPosition = window.scrollY + window.innerHeight / 4 * 3;

    productItems.forEach((item) => {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const productId = item.getAttribute("data-product");

        if (scrollPosition >= itemTop && scrollPosition <= itemBottom) {
            item.classList.add("active");
            item.classList.remove("passed");

            productImages.forEach((img) => {
                if (img.getAttribute("data-product") === productId) {
                    img.classList.add("active");
                } else {
                    img.classList.remove("active");
                }
            });
        } else if (scrollPosition > itemBottom) {
            item.classList.remove("active");
            item.classList.add("passed");
        } else {
            item.classList.remove("active");
            item.classList.remove("passed");
        }
    });
}

window.addEventListener("scroll", updateActiveProduct);
updateActiveProduct();





// tech section
// Swiper
document.addEventListener("DOMContentLoaded", () => {
    const techSec = document.querySelector(".tech-sec");
    const cursor = document.querySelector(".cursor");
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    let isDragging = false;
    let techActive = false;

    // 마우스 위치 추적
    document.addEventListener("pointermove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // tech-sec 진입/이탈 시 커서 표시 제어
    techSec.addEventListener("mouseenter", () => {
        techActive = true;
        cursor.style.opacity = "1";  // tech-section 진입 시 보여줌
        document.body.style.cursor = "none";
        currentX = mouseX; // 현재 마우스 위치로 초기화
        currentY = mouseY;
    });

    techSec.addEventListener("mouseleave", () => {
        techActive = false;
        cursor.style.opacity = "0";  // tech-section 벗어나면 숨김
        document.body.style.cursor = "default";
        isDragging = false;
        cursor.textContent = "Drag";
    });

    // Swiper 설정
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 60,
        allowTouchMove: true,
    });

    // ✅ Swiper DOM 요소에 직접 pointer 이벤트 등록
    const swiperEl = swiper.el;
    swiperEl.addEventListener("pointerdown", () => {
        isDragging = true;
        cursor.textContent = "< >";
    });

    swiperEl.addEventListener("pointerup", () => {
        isDragging = false;
        cursor.textContent = "Drag";
    });

    swiperEl.addEventListener("pointerleave", () => {
        isDragging = false;
        cursor.textContent = "Drag";
    });

    // 커서 애니메이션
    function animateCursor() {
        if (!techActive) { // tech-section 밖이면 애니메이션 건너뛰기
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



// video
const video = document.getElementById("bgVideo");
video.playbackRate = 0.75;