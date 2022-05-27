const locationMap = document.getElementById("location-map");
const locationBtn = document.querySelectorAll(".course");
const youngJin = document.getElementById("young-jin");
const gukBob = document.getElementById("guk-bob");
const jejuPig = document.getElementById("jeju-pig");
const subway = document.getElementById("subway");
const myPosition = document.getElementById("my-position");
const dbValue = document.getElementById("db-value").value;
// 영진 직업 전문 학원

const YUNGJIN = [35.87555082502176, 128.6816374505427];
const GUKBOB = [35.87583123506328, 128.6817532073904];
const JEJUPIG = [35.87664030121222, 128.68155341448463];
const SUBWAY2 = [35.87623769570281, 128.68104555230227];

let map;
let marker;
let userLatitude;
let userLongitude;
let clickPosition = "user";
let markers = [];

loading();
changeBtnCss(4);
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;

    drawMap(userLatitude, userLongitude);
    staticMarkder();
    addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    loading();
  });
  navigator.geolocation.watchPosition((pos) => {
    delMarkers();
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
    addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    if (clickPosition === "user") {
      panTo(userLatitude, userLongitude);
    }
  });
}
function loading() {
  const loadingWrap = document.querySelector(".loading-wrap");
  const body = document.querySelector("body");

  body.classList.toggle("touch-none");
  loadingWrap.classList.toggle("hidden");
}
function addMarker(position) {
  marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
}
function delMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}
function drawMyPosition(latitude, longitude) {
  const latlng = new kakao.maps.LatLng(latitude, longitude);

  marker = new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: "내위치",
  });
  marker.setMap(map);
}

function drawMap(latitude, longitude) {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };

  map = new kakao.maps.Map(locationMap, options);
  map.setZoomable(false);
}

function staticMarkder() {
  const positions = [
    {
      title: "영진",
      latlng: new kakao.maps.LatLng(YUNGJIN[0], YUNGJIN[1]),
    },
    {
      title: "국밥",
      latlng: new kakao.maps.LatLng(GUKBOB[0], GUKBOB[1]),
    },
    {
      title: "흑돈",
      latlng: new kakao.maps.LatLng(JEJUPIG[0], JEJUPIG[1]),
    },
    {
      title: "지하철 2번출구",
      latlng: new kakao.maps.LatLng(SUBWAY2[0], SUBWAY2[1]),
    },
  ];
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  for (let i = 0; i < positions.length; i++) {
    marker = new kakao.maps.Marker({
      map: map,
      position: positions[i].latlng,
      title: positions[i].title,
      image: markerImage,
    });
    marker.setMap(map);
  }
}
const panTo = (latitude, longitude) => {
  const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLon);
};
function changeBtnCss(target) {
  for (let i = 0; i < locationBtn.length; i++) {
    if (target === i) {
      locationBtn[i].classList.add("pick-on");
    } else {
      locationBtn[i].classList.remove("pick-on");
    }
  }
}

function chekcingDone() {
  const dbArray = dbValue.split(",");
  for (let i = 0; i < dbArray.length; i++) {
    if (dbArray[i] === "YUNGJIN") {
      const youngJinMark = document.querySelector(".young-jin-mark");
      youngJinMark.classList.remove("hidden");
    } else if (dbArray[i] === "GUKBOB") {
      const gukBobMark = document.querySelector(".guk-bob-mark");
      gukBobMark.classList.remove("hidden");
    } else if (dbArray[i] === "JEJUPIG") {
      const jejuPigMark = document.querySelector(".jeju-pig-mark");
      jejuPigMark.classList.remove("hidden");
    } else if (dbArray[i] === "SUBWAY2") {
      const subwayMark = document.querySelector(".subway-mark");
      subwayMark.classList.remove("hidden");
    }
  }
}
chekcingDone();
youngJin.addEventListener("click", function () {
  changeBtnCss(0);
  clickPosition = "other";
  panTo(YUNGJIN[0], YUNGJIN[1]);
});
gukBob.addEventListener("click", function () {
  changeBtnCss(1);
  clickPosition = "other";
  panTo(GUKBOB[0], GUKBOB[1]);
});
jejuPig.addEventListener("click", function () {
  changeBtnCss(2);
  clickPosition = "other";
  panTo(JEJUPIG[0], JEJUPIG[1]);
});
subway.addEventListener("click", function () {
  changeBtnCss(3);
  clickPosition = "other";
  panTo(SUBWAY2[0], SUBWAY2[1]);
});
myPosition.addEventListener("click", function () {
  changeBtnCss(4);
  clickPosition = "user";
  panTo(userLatitude, userLongitude);
});
