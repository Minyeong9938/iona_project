export default function initContactPage() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.447545, 126.702755),
            level: 3
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var markerPosition = new kakao.maps.LatLng(37.447545, 126.702755);

    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    marker.setMap(map);
}