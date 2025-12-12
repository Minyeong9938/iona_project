// contact section
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
        company: form.querySelector('.company').value,
        contact_person: form.querySelector('#contact_person').value,
        phone: form.querySelector('#phone').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value
    };

    const messageBox = document.getElementById('message-box');

    console.log("폼 데이터 제출됨:", data);

    // 성공 메시지 표시 (Alert 대신)
    messageBox.textContent = `${data.contact_person} 담당자님, 문의가 성공적으로 접수되었습니다.`;
    messageBox.className = 'message-box success show';

    form.reset();

    // 3초 후 메시지 숨기기
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

// 폼 이벤트 리스너를 연결합니다.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
} else {
    console.error("폼 엘리먼트 '#contact-form'을 찾을 수 없습니다.");
}

// map section
// 'sub-contact.js' (또는 해당 맵 초기화 코드)에 추가/수정
const KAKAO_MAP_APP_KEY = '493aa601afde4d230fbd93a72430b847';

function loadKakaoMapScript(callback) {
    // 이미 스크립트가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
        callback();
        return;
    }

    const script = document.createElement('script');
    // 'autoload=false' 파라미터를 추가하여 document.write 사용을 방지
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`;
    script.onload = () => {
        // 스크립트 로드 완료 후 지도 라이브러리 초기화
        kakao.maps.load(() => {
            callback();
        });
    };
    document.head.appendChild(script);
}

function initMap() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.450350, 126.702800),
            level: 3
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var markerPosition = new kakao.maps.LatLng(37.450350, 126.702800);

    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    marker.setMap(map);
}

// 비동기 로딩을 시작하고, 로드가 완료되면 지도를 초기화합니다.
loadKakaoMapScript(initMap);