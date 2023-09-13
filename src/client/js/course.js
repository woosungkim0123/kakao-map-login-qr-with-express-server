// 요청


async function qrData요청하기(type) {
  try {
      const 응답 = await fetch("/api/course", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },
          body: JSON.stringify({ type: type }),
      });

      const 데이터 = await 응답.json();
      if (데이터.success) {
          bottomMsg(type, "success");
      } else {
          bottomMsg("인증실패", "error");
      }
      setTimeout(startScan, 3000);
  } catch (에러) {
      console.error("오류 발생:", 에러);
      // 필요하다면 여기서 에러 메시지를 보여주거나 추가적으로 에러를 처리할 수 있습니다.
  }
}



const locationMap = document.getElementById("location-map");
const locationBtn = document.querySelectorAll(".course");
const youngJin = document.getElementById("young-jin");
const gukBob = document.getElementById("guk-bob");
const jejuPig = document.getElementById("jeju-pig");
const subway = document.getElementById("subway");
const myPosition = document.getElementById("my-position");
const dbValue = document.getElementById("db-value").value;
const dbArray = dbValue.split(",");
const testContainer = document.querySelector(".test");
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
let selectedMarker = null;

changeBtnCss(4);
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;

    drawMap(userLatitude, userLongitude);
    staticMarkder();
    addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
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
      title: "YUNGJIN",
      latlng: new kakao.maps.LatLng(YUNGJIN[0], YUNGJIN[1]),
      summary: "영진!",
    },
    {
      title: "GUKBOB",
      latlng: new kakao.maps.LatLng(GUKBOB[0], GUKBOB[1]),
      summary: "국밥먹어봄?",
    },
    {
      title: "JEJUPIG",
      latlng: new kakao.maps.LatLng(JEJUPIG[0], JEJUPIG[1]),
      summary: "제주돼지래..",
    },
    {
      title: "SUBWAY2",
      latlng: new kakao.maps.LatLng(SUBWAY2[0], SUBWAY2[1]),
      summary: "지하철 너무멈",
    },
  ];

  for (let i = 0; i < positions.length; i++) {
    addStaticMarker(positions[i]);
  }
}
function addStaticMarker(position) {
  let markerImageUrl = "/client/file/no-done.jpg";
  let markerImageNormalSize = new kakao.maps.Size(24, 35);
  let markerImageClickSize = new kakao.maps.Size(50, 65);
  if (dbArray.includes(position.title)) {
    markerImageUrl = "/client/file/complete.jpg";
    markerImageNormalSize = new kakao.maps.Size(50, 35);
    markerImageClickSize = new kakao.maps.Size(70, 65);
  }
  const normalImage = createMarkerImage(markerImageUrl, markerImageNormalSize);
  const clickImage = createMarkerImage(markerImageUrl, markerImageClickSize);
  const marker = new kakao.maps.Marker({
    map: map,
    position: position.latlng,
    title: position.title,
    image: normalImage,
  });

  marker.normalImage = normalImage;

  kakao.maps.event.addListener(marker, "click", function () {
    testContainer.classList.remove("hidden");
    testContainer.innerHTML = `<p style="color:#fff; font-weight:bold;">${position.title}은 ${position.summary}</p>`;
    if (!selectedMarker || selectedMarker !== marker) {
      !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
      marker.setImage(clickImage);
    }
    selectedMarker = marker;
  });
}
function createMarkerImage(url, markerSize) {
  const markerImg = new kakao.maps.MarkerImage(url, markerSize);
  return markerImg;
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
