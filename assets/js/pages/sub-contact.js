// contact section
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    if (!form) {
        console.error('contact-form을 찾을 수 없습니다.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        alert('문의가 정상적으로 접수되었습니다.');

        form.reset();
    });
});



// map section
const KAKAO_MAP_APP_KEY = '493aa601afde4d230fbd93a72430b847';

function loadKakaoMapScript(callback) {
    if (window.kakao && window.kakao.maps) {
        callback();
        return;
    }

    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`;
    script.onload = () => {
        kakao.maps.load(() => {
            callback();
        });
    };
    document.head.appendChild(script);
}

function initMap() {
    var mapContainer = document.getElementById('map'),
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

loadKakaoMapScript(initMap);