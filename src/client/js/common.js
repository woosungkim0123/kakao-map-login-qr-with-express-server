export const phoneTypeCheck = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return 'ios';
  } else if (/Android/i.test(navigator.userAgent)) {
    return 'android';
  } else {
    return 'pc';
  }
};

export const loading = () => {
  const loadingWrap = document.querySelector('.loading-wrap'),
    body = document.querySelector('body');

  body.classList.toggle('touch-none');
  loadingWrap.classList.toggle('hidden');
};
export const htmlErrorMsg = (input, msg, color) => {
  const errDiv = document.querySelector(`.${input.id}Error`);
  const parent = input.parentNode;
  parent.classList.add('warning');
  errDiv.innerHTML = `<p style="color:${color};">${msg}</p>`;
  input.focus();
};
export const errorMsgReset = () => {
  const inputAll = document.querySelectorAll('.inputAll');
  const inputErr = document.querySelectorAll('.inputErr');

  for (let i = 0; i < inputAll.length; i++) {
    if (inputAll[i].attributes.type.value === 'date') {
      inputAll[i].addEventListener('change', () => {
        while (inputErr[i].hasChildNodes()) {
          inputErr[i].removeChild(inputErr[i].firstChild);
        }
      });
    } else {
      inputAll[i].addEventListener('keyup', () => {
        while (inputErr[i].hasChildNodes()) {
          inputErr[i].removeChild(inputErr[i].firstChild);
          inputAll[i].parentNode.classList.remove('warning');
        }
      });
    }
  }
};

export const successAlert = (title, text, cb) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  }).then(cb);
};

export const errorAlert = (title, text, cb) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  }).then(cb);
};

export const loadingv2 = () => {
  const circle = document.querySelector('.circle2');
  circle.classList.toggle('hidden');
};

const loadingV3 = () => {
  const body = document.querySelector('body');
  body.classList.toggle('touch-none');
  if (!document.querySelector('.circle2')) {
    const circle = document.createElement('div');
    circle.classList.add('circle2');
    circle.classList.add('hidden');
    body.appendChild(circle);
  }
  document.querySelector('.circle2').classList.toggle('hidden');
};

// url에서 변수를 추출하는 함수
export const getParameterByName = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const errorMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({ title: `${msg}`, icon: 'error' });
};

const alert = (text, title) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonText: '확인',
  });
};

const dateStatus = (start_date, end_date) => {
  const now = today();
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const toDate = new Date(now);
  if (startDate > toDate) return 'before';
  else if (endDate <= toDate) return 'end';
  else if (startDate <= toDate && endDate > toDate) return 'ing';
};
const dateFormat = (d) => {
  let date = new Date(d);
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1)) +
    '-' +
    (date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate().toString())
  );
};

const today = () => {
  let date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

/**
 * Mobile(Android, IOS) Activity Controller
 * @param { string } type 모바일 타입 (android, ios)
 * @param { string } name 모바일 실행 함수 이름
 * @param { string || object } parameter 모바일 실행 함수 파라미터
 */
export const mobileDeviceActivityController = (type, name, parameter) => {
  if (type === 'android') {
    if (parameter) {
      if (name === 'matching') {
        window.HybridApp1[`${name}`](parameter);
      } else {
        window.HybridApp[`${name}`](parameter);
      }
    } else window.HybridApp[`${name}`]();
  } else if (type === 'ios') {
    window.webkit.messageHandlers[`${name}`].postMessage(parameter);
  } else {
    window.location.href = '/app' + parameter;
  }
};
/**
 * 서버 통신과 관련된 Class
 */
export class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }
  _optionSetting(option = '') {
    let options = {};
    const method = this._setMethod(option.method);
    options.method = method;
    const headers = this._setHeaders(option.type);
    if (headers) options.headers = headers;
    const body = this._setBody(option.data);
    if (body) options.body = body;
    return options;
  }
  _setMethod(method) {
    return method ? method.toUpperCase() : 'GET';
  }
  _setHeaders(type = '') {
    let headers = '';
    if (type.toUpperCase() === 'JSON') {
      headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }
    return headers;
  }
  _setBody(data) {
    return data ? JSON.stringify(data) : '';
  }
  /**
   * Post Json 요청 함수
   * @param { string } url 전송 URL 주소
   * @param { object || undefined } options 전송 옵션 (method, headers, data)
   * @return 전송 status
   */
  async http(url, option) {
    const options = this._optionSetting(option);
    return await fetch(`${this.baseURL}${url}`, options);
  }
}
