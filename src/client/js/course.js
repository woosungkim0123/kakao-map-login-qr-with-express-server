const course = document.querySelectorAll(".course");
const loadingContainer = document.querySelector(".loading-container");
const locationMap = document.getElementById("location-map");
const USER = "USER";
const OTHER = "OTHER";

let courseData = [];
let map;
let marker;
let userLatitude;
let userLongitude;
let clickPosition = "USER";

const loadingToggle = () => {
  loadingContainer.classList.toggle("hidden");
}

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
const addMarker = (data) => {
  let imgUrl = "/file/map_not_done.png";
  let imgSize = new kakao.maps.Size(24, 35);

  if (data.visited === "Y") {
    imgUrl = "/file/map_complete.jpg";
    imgSize = new kakao.maps.Size(20, 30);
  }
  new kakao.maps.Marker({
    map: map,
    title: data.name,
    position: new kakao.maps.LatLng(data.latitude, data.longitude),
    image: new kakao.maps.MarkerImage(imgUrl, imgSize),
  });
};
const staticMarker = () => {
  for (let i = 0; i < courseData.length; i++) {
    if (courseData[i].code === "USER") continue;
    addMarker(courseData[i]);
  }
};
const addUserMarker = (position) => {
  if(marker) marker.setMap(null);
  marker = new kakao.maps.Marker({ position });
  marker.setMap(map);
};
for (let i = 0; i < course.length; i++) {
  courseData.push({
    name: course[i].dataset.name,
    code: course[i].dataset.code,
    latitude: course[i].dataset.latitude,
    longitude: course[i].dataset.longitude,
    visited: course[i].dataset.visited,
  });
  course[i].addEventListener("click", clickMenu);
}
loadingToggle();
if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition((pos) => {
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
    drawMap(userLatitude, userLongitude);
    staticMarker();
    loadingToggle();
  });
  navigator.geolocation.watchPosition((pos) => {
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
    addUserMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    if (clickPosition === "USER") panTo(userLatitude, userLongitude);
  });
}
