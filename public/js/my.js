function checkLocalStorage() {
  for (let i = 0; i < 12; i++) {
    if (window.localStorage.getItem(`flag-${i}`) !== document.getElementsByClassName(`flag-${i}`)) {
      document.getElementsByClassName(`flag-${i}`)[0].innerHTML = window.localStorage.getItem(`flag-${i}`)
    }
  }
}

function getFlag() {
  let fl = 'na derzi'
  return fl
}

function changeInputBtnName() {
  var topPiraterWords = [
    'Эй, на палубе!',
    'Встать на якорь!',
    'Тишина на палубе!',
    'Смирно!',
    'Рад увидеть твою рожу снова!',
    'Освободите мои плавники, я хочу съесть еще!',
    'Есть только один верный флаг, и он черный',
    'Заткнись и дай пройти!',
    'Катитесь к Дейви Джонсу',
    'Он будет болтаться, как клещи на ветру!',
    'Он отдал концы',
    'Якорь мне в бухту!',
    'Он принял слишком много рома на борт.',
    'Коробка вонючих костей',
    'Трусливый щенок!',
    'Портовая крыса!',
    'Кальмарьи кишки!',
    'Попутного ветра!',
    'Спокойного моря!',
    'Полных парусов и сухого пороха!',
    'flag',
    'flag']
  document.getElementsByClassName('pirate-btn')[0].textContent = topPiraterWords[Math.floor(Math.random() * topPiraterWords.length)]
}

function requestAPI() {
  fetch('/api?flag=' + document.getElementsByClassName('input')[0].value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === 'poydet') {
        window.localStorage.setItem(`flag-${data.flag_number}`, data.flag)
      }

      document.getElementsByClassName('message')[0].innerHTML = 'Ответ: ' + data.status
      checkLocalStorage()
      changeInputBtnName()
    });
}

if (window.localStorage.getItem(`flag-0`) === 'flag') {
  checkLocalStorage()
}