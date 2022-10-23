function checkLocalStorage() {
  for (let i = 0; i < 12; i++) {
    if (window.localStorage.getItem(`flag-${i}`) !== document.getElementsByClassName(`flag-${i}`)) {
      document.getElementsByClassName(`flag-${i}`)[0].innerHTML = window.localStorage.getItem(
        `flag-${i}`
      );
    }
  }
}

function xssInjection() {
  let name = document.getElementById("xss").value;
  fetch(`/v2?name=${name}`)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
      document.getElementsByClassName("otvet")[0].innerHTML = data;
    });
}

function xssInjection2() {
  let name = document.getElementById("xss2").value;
  if (name.startsWith("<script>")) {
    name = name.slice(8);
  }
  if (name.endsWith("</script>")) {
    name = name.slice(0, name.length - 9);
  }
  document.getElementsByClassName("otvet2")[0].innerHTML = name;
  fetch(`/v3?name=${name}`)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementsByClassName("otvet2")[0].innerHTML = data;
    });
}

function showMeme() {
  let numberImage = Math.floor(Math.random() * 10);
  if (numberImage === 0) {
    numberImage = 1;
  }
  numberImage < 7 ? null : (numberImage = numberImage % 6);
  document.getElementById("meme").src = `./images/meme-${numberImage}.jpg`;
}

function getFlag() {
  fetch("/hint?flag=1")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    });
}

function changeInputBtnName() {
  var topPiraterWords = [
    "Эй, на палубе!",
    "Встать на якорь!",
    "Тишина на палубе!",
    "Смирно!",
    "Рад увидеть твою рожу снова!",
    "Освободите мои плавники, я хочу съесть еще!",
    "Есть только один верный флаг, и он черный",
    "Заткнись и дай пройти!",
    "Катитесь к Дейви Джонсу",
    "Он будет болтаться, как клещи на ветру!",
    "Он отдал концы",
    "Якорь мне в бухту!",
    "Он принял слишком много рома на борт.",
    "Коробка вонючих костей",
    "Трусливый щенок!",
    "Портовая крыса!",
    "Кальмарьи кишки!",
    "Попутного ветра!",
    "Спокойного моря!",
    "Полных парусов и сухого пороха!",
    "FLAG",
  ];
  document.getElementsByClassName("pirate-btn")[0].textContent =
    topPiraterWords[Math.floor(Math.random() * topPiraterWords.length)];
}

function requestAPI() {
  fetch("/api?flag=" + document.getElementsByClassName("input")[0].value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "Молодчинка😘") {
        window.localStorage.setItem(`flag-${data.flag_number}`, data.flag);
      }

      document.getElementsByClassName("message")[0].innerHTML = "Ответ: " + data.status;
      checkLocalStorage();
      changeInputBtnName();
    });
}

if (window.localStorage.getItem(`flag-0`) === "flag") {
  checkLocalStorage();
}

if (!window.localStorage.length) {
  for (let i = 0; i < 12; i++) {
    window.localStorage.setItem(`flag-${i}`, "*");
  }
  window.localStorage.setItem("Не менять", "Сломает страницу");
}
