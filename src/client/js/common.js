const phoneTypeCheck1 = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return "ios";
  } else if (/Android/i.test(navigator.userAgent)) {
    return "android";
  } else {
    return "pc";
  }
};

const addCorrectMenuStyle = (domArray, url) => {};
const loading = () => {
  const loadingWrap = document.querySelector(".loading-wrap"),
    body = document.querySelector("body");

  body.classList.toggle("touch-none");
  loadingWrap.classList.toggle("hidden");
};

const successAlert = (title, text, cb) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "확인",
  }).then(cb);
};

const errorAlert = (title, text, cb) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "확인",
  }).then(cb);
};

const loadingv2 = () => {
  const circle = document.querySelector(".circle2");
  circle.classList.toggle("hidden");
};

const loadingV3 = () => {
  const body = document.querySelector("body");
  body.classList.toggle("touch-none");
  if (!document.querySelector(".circle2")) {
    const circle = document.createElement("div");
    circle.classList.add("circle2");
    circle.classList.add("hidden");
    body.appendChild(circle);
  }
  document.querySelector(".circle2").classList.toggle("hidden");
};

// url에서 변수를 추출하는 함수
const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const errorMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({ title: `${msg}`, icon: "error" });
};

const alert = (text, title) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    confirmButtonText: "확인",
  });
};

/**
 * Mobile(Android, IOS) Activity Controller
 * @param { string } type 모바일 타입 (android, ios)
 * @param { string } name 모바일 실행 함수 이름
 * @param { string || object } parameter 모바일 실행 함수 파라미터
 */
