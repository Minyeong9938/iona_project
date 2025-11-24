export default function initTechPage() {
    const videoSection = document.querySelector(".video-sec");
    const text1 = document.querySelector(".text01");
    const text2 = document.querySelector(".text02");

    if (!videoSection || !text1 || !text2) return;

    text1.style.opacity = '1';
    text2.style.opacity = '0';

    text2.style.transform = 'translate(-50%, 70%)';

    function onScroll() {
        const secRect = videoSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;


        const t1StartPoint = 0;
        const t1EndPoint = -viewportHeight * 0.7;
        let t1Progress = Math.min(Math.max((t1StartPoint - secRect.top) / (t1StartPoint - t1EndPoint), 0), 1);


        if (secRect.top >= t1StartPoint) {

            text1.style.top = `${secRect.top + viewportHeight / 2}px`;
            text1.style.transform = `translate(-50%, -50%)`;
            text1.style.opacity = '1';

        } else if (secRect.top > t1EndPoint) {
            text1.style.top = `${viewportHeight / 2}px`;
            text1.style.transform = `translate(-50%, ${-50 - 60 * t1Progress}%)`;

            const fadeOutStart = 0.1;
            const fadeOutEnd = 0.7;
            const fadeOutRange = fadeOutEnd - fadeOutStart;

            let fadeOutProgress = Math.min(Math.max((t1Progress - fadeOutStart) / fadeOutRange, 0), 1);

            text1.style.opacity = `${1 - fadeOutProgress}`;

        } else {
            text1.style.opacity = '0';
        }

        const t2StartPoint = viewportHeight * 0.2;
        const t2EndPoint = viewportHeight * 1.5;

        let t2Progress = Math.min(Math.max((secRect.top + t2StartPoint) / (t2StartPoint - t2EndPoint), 0), 1);

        const fadeInStart = 0.1;
        const fadeInEnd = 0.7;
        const fadeInRange = fadeInEnd - fadeInStart;

        let fadeInProgress = Math.min(Math.max((t2Progress - fadeInStart) / fadeInRange, 0), 1);

        text2.style.opacity = `${fadeInProgress}`;

        text2.style.transform = `translate(-50%, ${70 - 80 * t2Progress}%)`;

        if (secRect.top <= -(viewportHeight * 1.5)) {
            videoSection.style.position = 'relative';
        } else {
            videoSection.style.position = 'sticky';
            videoSection.style.top = '0';
        }
    }


    window.addEventListener("scroll", onScroll);
    onScroll();
}