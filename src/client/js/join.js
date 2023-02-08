const joinForm = document.getElementById("joinForm");
const idForm = joinForm.querySelector("#id");
const pwForm = joinForm.querySelector("#pw");
const nameForm = joinForm.querySelector("#name");
const joinBtn = document.querySelector(".join-btn");

const bottomMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({ title: msg, icon: "error" });
}
const successAlert = () => {
  Swal.fire({
    title: '회원가입 완료',
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인'
  }).then(() => {
    location.href = "/users/login"
  })
}

const joinFetch = async () => {
  if(!idForm.value) return bottomMsg("아이디를 입력해주세요.")
  else if(!pwForm.value) return bottomMsg("비밀번호를 입력해주세요.")
  else if(!nameForm.value) return bottomMsg("이름을 입력해주세요.")
  
  const data = await (await fetch("/users/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 
      id : idForm.value,
      pw : pwForm.value,
      name : nameForm.value,
     }),
  })).json();
  if(data.code === "OK") successAlert();
  else bottomMsg(data.message);
}

joinBtn.addEventListener('click', joinFetch)