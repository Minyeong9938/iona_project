
const sections = document.querySelectorAll('.scroll-section');
const fixedImage = document.getElementById('fixedImage');

const sectionPositions = []; // 각 섹션의 y축 시작점 저장
let currentScroll = 0; // 현재 스크롤 위치
let currentImageSrc = sections[0].getAttribute('data-image-src');

// 초기 이미지 설정
fixedImage.src = currentImageSrc;

// 페이지 로드 시 각 섹션의 위치 계산
function updateSectionPositions() {
    sectionPositions.length = 0; // 배열 초기화
    sections.forEach(section => {
        // 섹션이 화면 상단에 도달하는 y좌표를 기준으로 설정
        sectionPositions.push(section.offsetTop);
    });
}

// 이미지 전환 함수
function switchImage(newImageSrc) {
    if (newImageSrc !== currentImageSrc) {
        currentImageSrc = newImageSrc;

        fixedImage.classList.add('fade-out');
        setTimeout(() => {
            fixedImage.src = newImageSrc;
            fixedImage.classList.remove('fade-out');
        }, 500);
    }
}

// 스크롤 이벤트 핸들러
window.addEventListener('scroll', () => {
    currentScroll = window.scrollY + window.innerHeight * 0.5; // 화면 중앙을 기준으로 계산

    let activeSectionIndex = 0;

    // 스크롤 위치를 기준으로 현재 활성화된 섹션을 찾음
    for (let i = sections.length - 1; i >= 0; i--) {
        if (currentScroll >= sectionPositions[i]) {
            activeSectionIndex = i;
            break;
        }
    }

    const newImageSrc = sections[activeSectionIndex].getAttribute('data-image-src');
    switchImage(newImageSrc);
});

// 초기 실행 및 리사이즈 시 위치 업데이트
updateSectionPositions();
window.addEventListener('resize', updateSectionPositions);

// 초기에 0번 섹션 이미지 로드
switchImage(sections[0].getAttribute('data-image-src'));