const course = document.querySelectorAll(".course");
const locationMap = document.getElementById("location-map");
const USER = "USER";
const OTHER = "OTHER";

let courseData = [];
let map;
let marker;
let userLatitude;
let userLongitude;
let clickPosition = "USER";
let markers = [];
let selectedMarker = null;

const menuStyleChange = (clickDom) => {
  for (let i = 0; i < course.length; i++) {
    if (course[i] === clickDom) course[i].classList.add("on");
    else course[i].classList.remove("on");
  }
};
const panTo = (latitude, longitude) => {
  const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLon);
};

const clickMenu = (e) => {
  const clickDom = e.currentTarget;
  if (clickDom.classList.contains("on")) return;

  menuStyleChange(clickDom);

  let latitude;
  let longitude;

  if (clickDom.dataset.code === USER) {
    latitude = userLatitude;
    longitude = userLongitude;
    clickPosition = USER;
  } else {
    latitude = clickDom.dataset.latitude;
    longitude = clickDom.dataset.longitude;
    clickPosition = OTHER;
  }

  panTo(latitude, longitude);
};

const drawMap = (latitude, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, options);
  map.setZoomable(false);
};

const staticMarker = () => {
  let imgUrl = "/file/no-done.jpg";
  let imgSize = new kakao.maps.Size(24, 35);

  for (let i = 0; i < courseData.length; i++) {
    if (courseData[i].visited === "Y") {
      imgUrl = "/file/complete.jpg";
      imgSize = new kakao.maps.Size(50, 35);
    }

    new kakao.maps.Marker({
      map: map,
      title: courseData[i].name,
      position: new kakao.maps.LatLng(
        courseData[i].latitude,
        courseData[i].longitude
      ),
      image: new kakao.maps.MarkerImage(imgUrl, imgSize),
    });
  }
};
const addUserMarker = (position) => {
  marker = new kakao.maps.Marker({ position });
  marker.setMap(map);
  //markers.push(marker);
};
for (let i = 0; i < course.length; i++) {
  courseData.push({
    name: course[i].dataset.name,
    code: course[i].dataset.code,
    latitude: course[i].dataset.latitude,
    longitude: course[i].dataset.longitude,
  });
  course[i].addEventListener("click", clickMenu);
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;

    drawMap(userLatitude, userLongitude);
    staticMarker();
    addUserMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
  });
  navigator.geolocation.watchPosition((pos) => {
    delMarkers();
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
    addUserMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    if (clickPosition === "USER") panTo(userLatitude, userLongitude);
  });
}

function delMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}
