// contact section
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
        company: form.querySelector('#company').value,
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