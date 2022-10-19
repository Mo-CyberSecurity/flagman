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
        status:
          "Попробуй написать флаг еще раз, но уже головой, мб стоит просто много попробовать?)",
      });
      break;
    case "flag":
      res.send({ status: "Регистр тоже важен)))" });
      break;
    case "FLAG":
      res.send({ flag_number: 0, flag: "flag", status: "Молодчинка😘" });
      break;
    case "derzi":
      res.send({ flag_number: 1, flag: "ya@", status: "Молодчинка😘" });
      break;
    case "_1B*C3":
      res.send({ flag_number: 2, flag: "ti@", status: "Молодчинка😘" });
      break;
    case "HELLOWORLD":
      res.send({ flag_number: 7, flag: "k3!", status: "Молодчинка😘" });
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

app.listen(port, () => {
  console.log(`Start on port:${port}`);
});

app.use(express.static(path.join(__dirname, "/public")));
