const express = require("express"),
  app = express(),
  path = require("path");

const port = process.env.YOUR_PORT || process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
});

app.get("*/hint*", (req, res) => {
  req.query.flag === "1" ? res.send("derzi") : null;
});

app.get("/api*", (req, res) => {
  var predictFlag = req.query.flag;

  switch (predictFlag) {
    case "ABOBUS123":
      res.send({
        status: "Попробуй написать флаг еще раз, может стоит просто нажать кнопку?)",
      });
      break;
    case "flag":
      res.send({ status: "Регистр тоже важен)))" });
      break;
    case "FLAG":
      res.send({ flag_number: 0, flag: "flag", status: "Молодчинка😘" });
      break;
    case "derzi":
      res.send({ flag_number: 1, flag: "AGZ1", status: "Молодчинка😘" });
      break;
    case "_1B*C3":
      res.send({ flag_number: 2, flag: "!da1", status: "Молодчинка😘" });
      break;
    case "KIT_TI_MAMY_LOVE":
      res.send({ flag_number: 3, flag: "babq1", status: "Молодчинка😘" });
      break;
    case "Curl_dlya_slabix":
      res.send({ flag_number: 4, flag: "curl", status: "Молодчинка😘" });
      break;
    case "HELLOWORLD":
      res.send({ flag_number: 5, flag: "k3!", status: "Молодчинка😘" });
      break;
    case "XssFlag":
      res.send({ flag_number: 6, flag: "lk4", status: "Молодчинка😘" });
      break;
    default:
      res.send({ status: "Попробуй еще солнце❤️" });
      break;
  }
});

app.get("/v2*", (req, res) => {
  const flag = {
    name: "Alex",
    email: "alex@site.com",
    role: "user",
    flag: "helloWorld",
  };
  if (req.query.name.indexOf("<script>") !== -1 && req.query.name.indexOf("</script>") !== -1) {
    res.send(eval(req.query.name.substr(8, req.query.name.length - 17)));
  } else {
    res.send(req.query.name);
  }
});

app.get("/v3*", (req, res) => {
  function flag() {
    return "XssFlag";
  }
  if (req.query.name.indexOf("<script>") !== -1 && req.query.name.indexOf("</script>") !== -1) {
    res.send(eval(req.query.name.substr(8, req.query.name.length - 17)));
  } else {
    res.send(req.query.name);
  }
});

app.get("/curl*", (req, res) => {
  if (req.headers["user-agent"].slice(0, 4) === "curl") {
    res.send(
      "А ты не плох, сможешь обмануть меня и сделать вид что запрос пришел с 'https://www.google.ru/', так еще и OPTIONS запросом"
    );
  }
});

app.options("/curl*", (req, res) => {
  const flag = "Curl_dlya_slabix";
  if (
    req.headers["user-agent"].slice(0, 4) === "curl" &&
    req.headers.referer === "https://www.google.ru/" &&
    req.method === "OPTIONS"
  ) {
    res.send(`держи плюшку ${flag}`);
  } else if (
    req.headers["user-agent"].slice(0, 4) === "curl" &&
    req.headers.referer === "https://www.google.ru/"
  ) {
    res.send("Мда... потерял, ты где-то OPTIONS");
  }
});

app.listen(port, () => {
  console.log(`Start on port:${port}`);
});

app.use(express.static(path.join(__dirname, "/public")));
