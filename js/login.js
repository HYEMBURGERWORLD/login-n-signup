// 아이디, 비번이 OK면 닉네임 님 반갑습니다 라고 뜸.
// 당연히!! 로그인 폼 사라짐, 로그인 글자도 로그인성공^___^ 으로 바꾸장

// 아이디가 local storage에 없는 경우 > 없는 아이디 입니다.
// 비밀번호가 틀린 경우 > 비밀번호를 확인하세요.

const loginForm = document.querySelector("#loginForm");

function login(event) {
  const idInput = document.querySelector("#idInput");
  const pwInput = document.querySelector("#pwInput");

  event.preventDefault();

  const idValue = JSON.parse(localStorage.getItem(idInput.value + ""));
  if (idValue != null && idValue.id === idInput.value) {
    if (idValue.pw === pwInput.value) {
      // 로그인 성공하면 html 변신~
      const mainString = document.querySelector("h1");
      loginForm.classList.add("hidden");
      mainString.innerText = `${idValue.name}님 환영합니다!`;
    } else {
      alert("비밀번호를 확인하세요");
      pwInput.value = "";
    }
  } else if (idValue == null) {
    alert("없는 아이디입니다.");
    idInput.value = "";
    pwInput.value = "";
  }
}

loginForm.addEventListener("submit", login);
