const progressBar = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent =
        (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercent + "%";
});

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