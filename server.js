const express = require("express"),
  app = express(),
  path = require("path");

const port = process.env.YOUR_PORT || process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
});

app.get("/api*", (req, res) => {
  var predictFlag = req.query.flag

  switch (predictFlag) {
    case 'ABOBUS123':
      res.send({ status: 'Попробуй написать флаг еще раз, но уже головой, мб стоит просто много попробовать?)' })
      break;
    case 'FLAG':
      res.send({ flag_number: 0, flag: 'flag', status: 'poydet' })
      break;
    case 'na derzi':
      res.send({ flag_number: 1, flag: 'ya@', status: 'poydet' })
      break;
    default:
      res.send({ status: 'try again' })
      break;
  }
});

app.listen(port, () => {
  console.log(`Start on port:${port}`);
});

app.use(express.static(path.join(__dirname, "/public")));
