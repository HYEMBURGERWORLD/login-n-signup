const signUpForm = document.querySelector("#signUpForm");
const idInput = document.querySelector("#idInput");
const idCheckSpan = document.querySelector("#idCheckSpan");

const pwInput = document.querySelector("#pwInput");
const pwCheckInput = document.querySelector("#pwCheckInput");
const pwCheckSpan = document.querySelector("#pwCheckSpan");

const IDOK_KEY = "아이디를 사용하실 수 있습니다.";
const PWOK_KEY = "비밀번호가 확인되었습니다!";

// 아이디 중복체크
function idCheck() {
  const ID_KEY = idInput.value;
  const getId = localStorage.getItem("user");
  const obj = JSON.parse(getId);
  const engReg = /^[a-zA-Z0-9]/;
  const etcReg = /[^a-zA-Z0-9]/gi;

  if (
    3 < ID_KEY.length &&
    obj.id !== ID_KEY &&
    engReg.test(ID_KEY) &&
    !etcReg.test(ID_KEY)
  ) {
    idCheckSpan.innerText = IDOK_KEY;
  } else if (!engReg.test(ID_KEY) || etcReg.test(ID_KEY)) {
    idCheckSpan.innerText = "영어와 숫자만 사용할 수 있어요.";
  } else if (ID_KEY.length < 4) {
    idCheckSpan.innerText = "아이디는 4글자 이상으로 정해주세요.";
  } else if (obj.id === ID_KEY) {
    idCheckSpan.innerText = "이미 있는 아이디예요";
  }
}

// 비밀번호 중복체크
function pwCheck() {
  if (pwInput.value === pwCheckInput.value) {
    pwCheckSpan.innerText = PWOK_KEY;
  } else pwCheckSpan.innerText = "비밀번호를 확인하세요";
  // 비밀번호 수정하면 비밀번호 확인창 리셋
}

// 비밀번호 변경시 리셋
function resetFunc() {
  pwCheckInput.value = "";
  pwCheckSpan.innerText = "";
}

// 비밀번호 6자 이상인가욤
function pwLengthCheck() {
  if (pwInput.value.length < 6) {
    const pwLengthSpan = document.querySelector("#pwLengthSpan");
    pwLengthSpan.innerText = "비밀번호는 6자 이상 입력해주세요.";
  } else pwLengthSpan.innerText = "";
}

// 회원가입 정보 localStorage에 저장
function signUp(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#nameInput");
  const birthInput = document.querySelector("#birthInput");

  let obj = {};

  if (
    pwCheckSpan.innerText === PWOK_KEY &&
    idCheckSpan.innerText === IDOK_KEY
  ) {
    obj.id = idInput.value;
    obj.pw = pwInput.value;
    obj.name = nameInput.value;
    obj.birth = birthInput.value;

    localStorage.setItem("user", JSON.stringify(obj));
    alert("회원가입이 완료되었습니다!");
    window.location.assign("index.html");
  }
}

// Event Listner
idInput.addEventListener("keyup", idCheck);

pwCheckInput.addEventListener("keyup", pwCheck); // pw 똑같이 썼는지 체크

pwInput.addEventListener("keydown", resetFunc); // pw 수정시 비밀번호 확인, 확인문구 초기화
pwInput.addEventListener("keyup", pwLengthCheck);

signUpForm.addEventListener("submit", signUp);
